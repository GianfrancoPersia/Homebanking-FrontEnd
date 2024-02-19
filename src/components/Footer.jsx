import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-5 flex justify-center">
      <div className="flex flex-wrap justify-between">
        <div className="w-[33%] flex flex-col gap-2 justify-center">
          <h4 className="text-lg font-bold">Contact Us</h4>
          <p>Email: info@paynowbank.com</p>
          <p>Phone: 1-800-PAY-NOW</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>

        <div className="w-[33%] flex flex-col gap-2">
          <h4 className="text-lg font-bold">About PayNow</h4>
          <p>PayNow is committed to providing convenient and secure banking services to our customers.</p>
        </div>

        <div className="text-center w-[33%]">
          <p>© 2024 PayNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer