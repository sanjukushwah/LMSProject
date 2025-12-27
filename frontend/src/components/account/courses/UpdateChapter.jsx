
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { apiUrl, token } from '../../common/Config';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';


const UpdateChapter = ({setChapters,chapterData,showChapter,handleClose}) => {

     const [loading,setLoading] = useState(false);
     const {register,handleSubmit,formState:{errors},reset} = useForm();


        const onSubmit =async (data)=>{
            setLoading(true)
                    
                         await fetch(`${apiUrl}/chapters/${chapterData.id}`,{
                        method:'PUT',
                        headers:{
                            'content-type':'application/json',
                            'Accept':"application/json",
                            'Authorization':`Bearer ${token}`
                        },
                        body:JSON.stringify({chapter: data.chapter})
                    })
                    .then(res=>res.json())
                    .then(result =>{
                        setLoading(false)                       
                        if(result.status ==200){
                            
                           setChapters({type:"UPDATE_CHAPTERS",payload:result.data})
                            handleClose();
    
                           toast.success(result.message)

                          
                        }else{
                           toast.error("Something went wrong");
                        }
                    });
                    }

        useEffect(()=>{
            if(chapterData){
                reset({
                    chapter:chapterData.title
                })
            }
        },[chapterData,reset])
  return (
    <>
     <Modal size='lg' show={showChapter} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
          <Modal.Title>Update Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="mb-3">
                <label htmlFor="" className='form-label'>Title</label>
                <input
                {
                    ...register('chapter',{
                        required:"The chapter field is required."
                    })
                }
                type="text" className={`form-control ${errors.chapter && 'is-invalid'}`} placeholder='Chapter' />
                {
                                                    errors.chapter && <p className='invalid-feedback'>{errors.chapter.message}</p>
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

export default UpdateChapter