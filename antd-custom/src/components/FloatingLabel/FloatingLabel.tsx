import { Form } from 'antd'
import FloatInput from '../FloatInput'
import './index.css'

export default function FloatingLabel() {
  return (
    <div className='example mt-10'>
      <Form size='large' name='user_login' className='login-form' layout='vertical'>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            }
          ]}
          hasFeedback
        >
          <FloatInput label='Email' placeholder='Email here please' name='email' />
        </Form.Item>
      </Form>
    </div>
  )
}
