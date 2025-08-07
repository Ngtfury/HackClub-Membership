'use client'

import { useState } from 'react'
import { apiConfig } from '@/lib/api-config'
import SuccessPage from '@/components/success-page'
import Footer from '@/components/footer'

interface FormData {
  name: string
  email: string
  phone: string
  department: string
  year: string
  githubUrl: string
  linkedinUrl: string
  portfolio: string
  hasExperience: string
  isAvailable: string
  skills: string
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    githubUrl: '',
    linkedinUrl: '',
    portfolio: '',
    hasExperience: '',
    isAvailable: '',
    skills: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessPage, setShowSuccessPage] = useState(false) // New state for success page

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.submit}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Show success page instead of alert
        setShowSuccessPage(true)
        // Optionally reset form after a delay or on success page close
        // setFormData(...)
      } else {
        alert('Failed to submit form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccessPage) {
    return <SuccessPage />
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{
        '--select-button-svg': 'url(\'data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(138,103,96)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e\')',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f5f1f0] px-10 py-3">
          <div className="flex items-center gap-4 text-[#181211]">
            <div className="size-7">
              <img 
                src="/assets/hackclubasiet.png" 
                alt="HackClub Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-[#181211] text-lg font-bold leading-tight tracking-[-0.015em]">HackClub ASIET - Membership (2025)</h2>
          </div>
        </header>
        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="min-w-72">
                <h1 className="text-[#181211] tracking-light text-[32px] font-bold leading-tight">
                  Join HackClub ASIET and discover the <span className="text-[#f55c3d]">joy of code</span>, together.
                </h1>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <span className="text-[#181211] text-sm font-medium mb-1">
                    Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    name="name"
                    placeholder="Name"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181211] focus:outline-0 focus:ring-0 border border-[#e6dddb] bg-white focus:border-[#e6dddb] h-14 placeholder:text-[#8a6760] p-[15px] text-base font-normal leading-normal"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <span className="text-[#181211] text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181211] focus:outline-0 focus:ring-0 border border-[#e6dddb] bg-white focus:border-[#e6dddb] h-14 placeholder:text-[#8a6760] p-[15px] text-base font-normal leading-normal"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <span className="text-[#181211] text-sm font-medium mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181211] focus:outline-0 focus:ring-0 border border-[#e6dddb] bg-white focus:border-[#e6dddb] h-14 placeholder:text-[#8a6760] p-[15px] text-base font-normal leading-normal"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <span className="text-[#181211] text-sm font-medium mb-1">
                    Department <span className="text-red-500">*</span>
                  </span>
                  <select
                    name="department"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181211] focus:outline-0 focus:ring-0 border border-[#e6dddb] bg-white focus:border-[#e6dddb] hover:border-[#d4c5c2] focus:border-[#c4b3b0] h-14 bg-[image:var(--select-button-svg)] bg-no-repeat bg-right-[15px] bg-center placeholder:text-[#8a6760] p-[15px] text-base font-normal leading-normal appearance-none transition-colors duration-200"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Department</option>
                    <option value="CSE">Computer Science and Engineering</option>
                    <option value="EEE">Electrical and Electronics Engineering</option>
                    <option value="EC">Electronics and Communication</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="CE">Civil Engineering</option>
                    <option value="EBE">Biomedical Engineering</option>
                  </select>
                </label>
              </div>
              
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <span className="text-[#181211] text-sm font-medium mb-1">
                    Year <span className="text-red-500">*</span>
                  </span>
                  <select
                    name="year"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181211] focus:outline-0 focus:ring-0 border border-[#e6dddb] bg-white focus:border-[#e6dddb] hover:border-[#d4c5c2] focus:border-[#c4b3b0] h-14 bg-[image:var(--select-button-svg)] bg-no-repeat bg-right-[15px] bg-center placeholder:text-[#8a6760] p-[15px] text-base font-normal leading-normal appearance-none transition-colors duration-200"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </label>
              </div>
              
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    name="githubUrl"
                    type="url"
                    placeholder="GitHub URL"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181211] focus:outline-0 focus:ring-0 border border-[#e6dddb] bg-white focus:border-[#e6dddb] h-14 placeholder:text-[#8a6760] p-[15px] text-base font-normal leading-normal"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    name="linkedinUrl"
                    type="url"
                    placeholder="LinkedIn URL"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181211] focus:outline-0 focus:ring-0 border border-[#e6dddb] bg-white focus:border-[#e6dddb] h-14 placeholder:text-[#8a6760] p-[15px] text-base font-normal leading-normal"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <textarea
                    name="portfolio"
                    placeholder="Portfolio / Personal Projects"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181211] focus:outline-0 focus:ring-0 border border-[#e6dddb] bg-white focus:border-[#e6dddb] min-h-36 placeholder:text-[#8a6760] p-[15px] text-base font-normal leading-normal"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              
              <div className="flex flex-wrap gap-3 p-4">
                <p className="text-[#181211] text-sm font-medium mb-2 w-full">Ready to volunteer?</p>
                <label className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border px-4 h-11 text-[#181211] relative cursor-pointer ${
                  formData.hasExperience === 'yes' 
                    ? 'border-[3px] border-[#f55c3d] px-3.5' 
                    : 'border-[#e6dddb]'
                }`}>
                  Yes
                  <input 
                    type="radio" 
                    className="invisible absolute" 
                    name="hasExperience"
                    checked={formData.hasExperience === 'yes'}
                    onChange={() => handleRadioChange('hasExperience', 'yes')}
                  />
                </label>
                <label className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border px-4 h-11 text-[#181211] relative cursor-pointer ${
                  formData.hasExperience === 'no' 
                    ? 'border-[3px] border-[#f55c3d] px-3.5' 
                    : 'border-[#e6dddb]'
                }`}>
                  No
                  <input 
                    type="radio" 
                    className="invisible absolute" 
                    name="hasExperience"
                    checked={formData.hasExperience === 'no'}
                    onChange={() => handleRadioChange('hasExperience', 'no')}
                  />
                </label>
              </div>
              
              <div className="flex flex-wrap gap-3 p-4">
                <p className="text-[#181211] text-sm font-medium mb-2 w-full">Ready to join in for projects?</p>
                <label className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border px-4 h-11 text-[#181211] relative cursor-pointer ${
                  formData.isAvailable === 'yes' 
                    ? 'border-[3px] border-[#f55c3d] px-3.5' 
                    : 'border-[#e6dddb]'
                }`}>
                  Yes
                  <input 
                    type="radio" 
                    className="invisible absolute" 
                    name="isAvailable"
                    checked={formData.isAvailable === 'yes'}
                    onChange={() => handleRadioChange('isAvailable', 'yes')}
                  />
                </label>
                <label className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border px-4 h-11 text-[#181211] relative cursor-pointer ${
                  formData.isAvailable === 'no' 
                    ? 'border-[3px] border-[#f55c3d] px-3.5' 
                    : 'border-[#e6dddb]'
                }`}>
                  No
                  <input 
                    type="radio" 
                    className="invisible absolute" 
                    name="isAvailable"
                    checked={formData.isAvailable === 'no'}
                    onChange={() => handleRadioChange('isAvailable', 'no')}
                  />
                </label>
              </div>
              
              {formData.isAvailable === 'yes' && (
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <textarea
                      name="skills"
                      placeholder="Describe your skills (50-word limit)"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181211] focus:outline-0 focus:ring-0 border border-[#e6dddb] bg-white focus:border-[#e6dddb] min-h-36 placeholder:text-[#8a6760] p-[15px] text-base font-normal leading-normal"
                      value={formData.skills}
                      onChange={handleInputChange}
                      maxLength={300}
                    />
                  </label>
                </div>
              )}
              
              <div className="flex px-4 py-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#f55c3d] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="truncate">
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </span>
                </button>
              </div>
            </form>
            <Footer />
          </div>
        </div>
      
      </div>
    </div>
  )
}
