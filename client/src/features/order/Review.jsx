import React, { useEffect, useState } from 'react'
import { useOrder } from '../../contexts/OrderContextProvider'
import OrderItem from './OrderItem';
import Button from '../../components/Button';
import { placeOrder } from '../../services/order';
import { useUser } from '../../contexts/UserContextProvider';
import toast from 'react-hot-toast';
import { useCart } from '../../contexts/CartContextProvider';
import { useNavigate } from 'react-router-dom';

function Review() {
    const {address,orderItem}=useOrder()
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [totalAmount,setTotalAmount]=useState()
    const {token}=useUser()
    const {fetchCartItem}=useCart()
    const navigate=useNavigate()

    function methodHandler(e){
        setPaymentMethod(e.target.value)
    }
    function calculateTotalAmount(){
        const total = orderItem.reduce((acc, item) => acc + item.totalAmount, 0)
        setTotalAmount(total)
    }

   async function orderHandler(){
    if(address && orderItem.length>0){
        const item=[]
        orderItem.forEach((oi)=>{
            let obj={
                productId:oi.productId._id,
                quantity:oi.quantity
            }
            item.push(obj)
        })

        try {
            const response=await placeOrder(address,item,token)
            if(response){
                toast.success("Order Placed Successfully")
                await fetchCartItem()
                alert("Order Placed Successfully")
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    }

    useEffect(()=>{
        if(orderItem.length>0){
            calculateTotalAmount()
        }
    })

    if(!address || orderItem.length===0 || !token){
        return null
    }
  return (
    <div>
        <div className='md:flex px-5 py-4 justify-between'>
            <div className='w-full md:w-[60%]'>
                <div className='border border-stone-300 py-3 pl-4'>
                    <h1 className='font-semibold mb-4'>Shipping Info</h1>
                    <div>
                        <h1 className='font-semibold '>{address.name}</h1>
                        <p>{address.mobile}</p>
                        <p>{address.addressLine}</p>
                        <p>{address.landmark}</p>
                        <p>{address.city},{address.state}</p>
                    </div>
                </div>
                <div className='border border-stone-300 mt-5 py-3 px-4 mb-5'>
                    <h1 className='font-semibold mb-4'>Select Payment</h1>
                    <div>
                        <input type="radio" name="method" className="radio radio-primary" id='codMethod' value='cod' onChange={methodHandler} checked={paymentMethod === 'cod'}/>
                        <label htmlFor="codMethod" className='font-semibold ml-3'>Pay on Delivery</label>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-[35%]'>
                <div className='border border-stone-300 p-4'>
                    <h1 className='font-semibold mb-4'>Order Items</h1>
                    <div>
                        {
                            orderItem.map((item)=>{
                                return(
                                    <OrderItem item={item} key={item._id}></OrderItem>
                                )
                            })
                        }
                    </div>
                    <div className='flex justify-between px-3 font-semibold'>
                        <h3>Total Amount</h3>
                        <h3>&#8377;{totalAmount}</h3>
                    </div>
                    <div className='w-[70%] mx-auto'>
                        <Button value='Place Order' buttonStyle='mt-4' onClick={orderHandler}></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Review