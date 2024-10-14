import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createUser} from '@/lib/actions/user.action'

export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET');
  }

  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers");
    return new Response('Error occurred -- no svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', { status: 400 });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  
  if(eventType === 'user.created')
  {
     const {id, email_addresses, image_url, first_name, last_name, username } = evt.data;

     const user = {
      clerkId: id,
      firstName: first_name!, //The non-null assertion operator (!) tells TypeScript that you are confident that the value will not be null or undefined.
      lastName: last_name!,
      username: username!,
      email: email_addresses[0].email_address,
      profileImage: image_url,
    };

    const newUser = await createUser(user);

     if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser.id,
          },
        });
      }

      return NextResponse.json({ message: 'OK', user: newUser });
    }
  return new Response('', { status: 200 })
}