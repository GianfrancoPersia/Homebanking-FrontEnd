import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-5 flex justify-center">
      <div className="flex flex-wrap gap-10">
        <div className="flex flex-col gap-2 justify-center">
          <h4 className="text-lg font-bold">Contact Us</h4>
          <p>Email: info@paynowbank.com</p>
          <p>Phone: 1-800-PAY-NOW</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>

        <div className="flex flex-col gap-2 w-[275px]">
          <h4 className="text-lg font-bold">About PayNow</h4>
          <p>PayNow is committed to providing convenient and secure banking services to our customers.</p>
        </div>

        <div className="text-center">
          <p>© 2024 PayNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer