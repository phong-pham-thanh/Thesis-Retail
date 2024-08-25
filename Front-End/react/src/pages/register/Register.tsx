import { Button, Form, Input } from 'antd'
import React from 'react'
import image from '../../icon/Illustration.svg'
import logo from '../../icon/appLogo.svg'
import './register.css'
import CustomInput from '../component/searchBox'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate()

    const onFinish = () => {
        const data = form.getFieldsValue()
        console.log(data)
    }

  return (
    <div className='register'>
        <Form className='form-signup' layout='vertical' onFinish={onFinish} form={form}>
            <img src={logo} alt='' />
            <h2 className='title'>Sign Up</h2>
            <Form.Item
              className="fullname"
              label={"Full Name"}
              name={"fullname"}
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="username"
              label={"Username"}
              name={"username"}
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="email"
              label={"Email Address"}
              name={"email"}
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="password"
              label={"Password"}
              name={"password"}
              required
            >
              <Input.Password />
            </Form.Item>
            <div className='action'>
                <Button onClick={onFinish}>Sign Up</Button>
                <Button onClick={() => navigate('/login')}>Sign In</Button>
            </div>
        </Form>
        <div className='right-content'><img src={image} alt='image' className='image' /></div>
    </div>
  )
}

export default Register