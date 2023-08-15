import { ProductModel } from '@/models'
import * as next from '@nextui-org/react'
import { useCallback } from 'react'
import { Eyes } from '@components/icons'
import { useDisclosure } from '@nextui-org/react'

interface Props {
  product: ProductModel
}
export const ProductModal: React.FC<Props> = ({ product}) => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  const showDetails = useCallback(
    (product: ProductModel) => {
      console.log(product)
      onOpen()
    },
    [product]
  )

  return (
    <>
      <next.Tooltip content='Details' color='primary'>
        <span
          className='text-lg text-default-400 cursor-pointer active:opacity-50'
          onClick={() => showDetails(product)}
        >
          <Eyes />
        </span>
      </next.Tooltip>
      <next.Modal size='2xl' isOpen={isOpen} onClose={onClose}>
        <next.ModalContent>
          {(onClose) => (
            <>
              <next.ModalHeader className='flex flex-col gap-1'>
                Details
              </next.ModalHeader>
              <next.ModalBody>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col'>
                    <label> User </label>
                    <p>{product.user}</p>
                  </div>
                  <div className='flex flex-col'>
                    <label> Card Number </label>
                    <p>{product.cardNumber}</p>
                  </div>
                  <div className='flex flex-col'>
                    <label> Card Holder </label>
                    <p>{product.cardHolder}</p>
                  </div>
                  <div className='flex flex-col'>
                    <label> Pin </label>
                    <p>{product.pin}</p>
                  </div>
                </div>
              </next.ModalBody>
              <next.ModalFooter>
                <next.Button color='danger' variant='light' onClick={onClose}>
                  Close
                </next.Button>
              </next.ModalFooter>
            </>
          )}
        </next.ModalContent>
      </next.Modal>
    </>
  )
}
