import { useEffect, useState } from 'react';
import classes from './contact-form.module.css'
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {



    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json',
        }

    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
    }
}

function ContactForm() {
    const [form, setForm] = useState({
        email: "",
        name: "",
        message: ""
    });
    const [requestStatus, setRequestStatus] = useState();
    const [requestError, setRequestError] = useState();

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if(requestStatus === 'success' || requestStatus === 'error'){
            const timer = setTimeout(() => {
                setRequestStatus(null)
                setRequestError(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [requestStatus])

    async function sendMessageHandler(event) {
        event.preventDefault();

        setRequestStatus('pending')

        try {
            await sendContactData({
                email: form.email,
                name: form.name,
                message: form.message
            })

            setRequestStatus('success')

            setForm({
                email: "",
                name: "",
                message: ""
            })
        } catch (error) {
            setRequestStatus('error')
            setRequestError(error.message)
        }


    }

    let notification;

    if(requestStatus === 'pending'){
        notification = {
            status:'pending',
            title: 'Sending message',
            message: 'Your message is on its way'
        }
    }

    if(requestStatus === 'success'){
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!'
        }
    }
    if(requestStatus === 'error'){
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError
        }
    }




    return <section className={classes.contact}>
        <h1>How can I help you?</h1>
        <form className={classes.form} onSubmit={sendMessageHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required value={form.email} name="email" onChange={handleChange} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='name'>Your Name</label>
                    <input type='text' id='name' required value={form.name} name="name" onChange={handleChange} />
                </div>


            </div>
            <div className={classes.control}>
                <label htmlFor='message'>Your Message</label>
                <textarea id='message' rows={5} required value={form.message} name="message" onChange={handleChange}></textarea>
            </div>
            <div className={classes.actions}>
                <button>Send message</button>
            </div>
        </form>
        {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    </section>
}

export default ContactForm;