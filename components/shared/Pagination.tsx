import React from 'react'
import { Button } from '../ui/button';


const Pagination = ({ page, totalPages, setPage }: {page: number, totalPages: number, setPage : (arg: number) => void}) => {  
    const onClick = (btnType: string) => {
      const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1
      setPage(pageValue)
    }
  
    return (
      <div className="flex justify-center gap-2 pb-5">
        <Button
          size="lg"
          variant="outline"
          className="w-28"
          onClick={() => onClick('prev')}
          disabled={Number(page) <= 1}
        >
          Previous
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-28"
          onClick={() => onClick('next')}
          disabled={Number(page) >= totalPages}
        >
          Next
        </Button>
      </div>
    )
  }

export default Pagination