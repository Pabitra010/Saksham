import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const FooterPage = () => {
    const emergencyContacts = [
        { name: 'National Emergency', number: '1070' },
        { name: 'Disaster Management', number: '108' },
        { name: 'Fire Department', number: '101' },
        { name: 'Police', number: '100' },
    ]

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Classroom', path: '/classroom' },
        { name: 'Simulations', path: '/simulations' },
        { name: 'Alerts', path: '/alerts' },
    ]

    const socialLinks = [
        { Icon: FaFacebookF, href: '#', label: 'Facebook' },
        { Icon: FaTwitter, href: '#', label: 'Twitter' },
        { Icon: FaInstagram, href: '#', label: 'Instagram' },
        { Icon: FaYoutube, href: '#', label: 'YouTube' },
    ]

    return (
        <footer className="bg-[#164868] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Emergency Helpline Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Emergency Helpline</h2>
                        <ul className="space-y-2">
                            {emergencyContacts.map((contact) => (
                                <li key={contact.name}>
                                    {contact.name}: {contact.number}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-2">Quick Links</h2>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.path} className="hover:text-yellow-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community Guidelines Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Community Guidelines</h2>
                        <p className="mb-4">
                            Read our community guidelines to understand how to contribute positively to our platform.
                        </p>
                        <Link href="/guidelines" className="text-white hover:text-yellow-300">
                            View Guidelines
                        </Link>
                    </div>

                    {/* Contact Us Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                        <p className="mb-2">Email: support@saksham-ndr.gov</p>
                        <p className="mb-4">Phone: +91-XXX-XXXX-XXXX</p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    className="hover:text-yellow-300"
                                    aria-label={social.label}
                                >
                                    <social.Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-12 pt-4 border-t border-gray-600 text-center">
                    <p>© 2023 National Disaster Resilience and Saksham. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default FooterPage
