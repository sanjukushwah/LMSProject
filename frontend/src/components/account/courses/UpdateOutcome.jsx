
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../common/Config';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const UpdateOutcome = ({showOutcome,handleClose,outcomes,setOutcomes,outcomeData}) => {

            const [loading,setLoading] = useState(false);
            const {register,handleSubmit,formState:{errors},reset} = useForm();


        const onSubmit =async (data)=>{
            setLoading(true)
                    
                         await fetch(`${apiUrl}/outcomes/${outcomeData.id}`,{
                        method:'PUT',
                        headers:{
                            'content-type':'application/json',
                            'Accept':"application/json",
                            'Authorization':`Bearer ${token}`
                        },
                        body:JSON.stringify({outcome: data.outcome})
                    })
                    .then(res=>res.json())
                    .then(result =>{
                        setLoading(false)
                        console.log(result)
                        if(result.status ==200){
                            // const newoutcomes = [...outcomes,result.data]
                            // setOutcomes(newoutcomes)
                            const updatedOutcomes = outcomes.map(outcome => outcome.id == result.data.id ? {...outcome, text:result.data.text}:outcome)
                            setOutcomes(updatedOutcomes)
    //                         setOutcomes(outcomes.map(item =>
    //   item.id === outcomeData.id
    //     ? { ...item, text: data.outcome }
    //     : item
    // ));
                            handleClose();
    
                           toast.success(result.message)

                          
                        }else{
                           toast.error("Something went wrong");
                        }
                    });
                    }

        useEffect(()=>{
            if(outcomeData){
                reset({
                    outcome:outcomeData.text
                })
            }
        },[outcomeData,reset])
  return (
    <>
      <Modal size='lg' show={showOutcome} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
          <Modal.Title>Update Outcome</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="mb-3">
                <label htmlFor="" className='form-label'>Title</label>
                <input
                {
                    ...register('outcome',{
                        required:"The outcome field is required."
                    })
                }
                type="text" className={`form-control ${errors.outcome && 'is-invalid'}`} placeholder='Outcome' />
                {
                                                    errors.outcome && <p className='invalid-feedback'>{errors.outcome.message}</p>
                                                }
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
          <button disabled={loading}
                                 className='btn btn-primary'>{loading == false ? 'Save' :"Please wait..."}</button>
        </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default UpdateOutcome