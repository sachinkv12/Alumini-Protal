import '../../pages/Jobs/jobs.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import JobPost from "../JobPost";
import { useSelector } from 'react-redux';
import PageSubTitle from '../PageSubTitle';
import { Route, Routes } from "react-router-dom";
import Donations from '../../pages/Donations';
import Sponsorships from '../../pages/Sponsorships';
import { useLocation } from 'react-router-dom';
import { Archive } from '../../pages/Jobs/Archive';



const IntJobs = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [rangeValue, setRangeValue] = useState(0);
    const [questions, setQuestions] = useState(['']);
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [internships, setInternships] = useState([]);
    const [archivedJobs, setArchivedJobs] = useState([]);
    const [archivedInternships, setArchivedInternships] = useState([]);
    const title = props.title;
    const titleS = props.titleS;
    const handleDropdownSelect = props.handleDropdownSelect;
    const profile = useSelector((state) => state.profile);
    const buttontext1Link = "/jobs";
    const buttontext2Link = "/jobs/archive";
    const buttontext3Link = "/internships";
    const buttontext4Link = "/internships/archive";
    const [selectedEmploymentType, setSelectedEmploymentType] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    let admin;
    if (profile.profileLevel === 0 || profile.profileLevel === 1) {
        admin = true;
    }
    const pathname = useLocation().pathname;

    const handleSearchChange = (e, selectedOption, type) => {
        let updatedSearchQuery = { ...props.searchQuery };

        if (type === 'text') {
            updatedSearchQuery.title = e.target.value; 
        } else if (type === 'employmentType') {
            if (selectedOption === "") {

                setSelectedEmploymentType("");
                updatedSearchQuery.employmentType = "";
                setSelectedEmploymentType('Employment-Type');

            } else {
                setSelectedEmploymentType(selectedOption);
                updatedSearchQuery.employmentType = selectedOption;
            }
        } else if (type === 'category') {
            if (selectedOption === "") {
                setSelectedCategory("");
                updatedSearchQuery.category = "";
                setSelectedCategory('Category');
            } else {
                setSelectedCategory(selectedOption);
                updatedSearchQuery.category = selectedOption;
            }
        }

        props.setSearchQuery(updatedSearchQuery);
        console.log('search', props.setSearchQuery);
    };







    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );
        return (
            <button
                type="button"
                style={{ backgroundColor: 'pink' }}
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        );
    }

    const handleRangeChange = (event) => {
        setRangeValue(event.target.value);
    };
    function MyVerticallyCenteredModal(props) {
        const [formData, setFormData] = useState({
            userId: profile._id,
            title: '',
            location: '',
            salaryMin: '',
            salaryMax: '',
            currency: 'INR',
            duration: 'per hour',
            employmentType: 'Full-time',
            category: 'Other',
            type: '',
            description: '',
            attachments: [],
           paid:false,
           unpaid:false
        });
        const [loading, setLoading] = useState(false);
        const [isJobChecked, setIsJobChecked] = useState(false);
        const [isInternshipChecked, setIsInternshipChecked] = useState(false);
        const [formError, setFormError] = useState('');

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        };

        const handleCoverImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const coverImageData = reader.result;
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        coverImage: coverImageData,
                    }));
                };
                reader.readAsDataURL(file);
            }
        };

        const handleImageChange = (e) => {
            const files = e.target.files;
            if (files) {
                const filesArray = Array.from(files);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    attachments: filesArray,
                }));
            }
        };

        const handlePublish = async () => {
            if (!formData.type) {
                setFormError('Please select either Job or Internship.');
                return; // Prevent form submission
            }
            setLoading(true);
           
        
            // Add salary information only if the position is paid
            // if (isPaid) {
            //     salaryMin=formData.salaryMin;
            //     salaryMax=formData.salaryMax;
            // }

            try {
                // const formDataToSend = new FormData();


                // for (const key in formData) {
                 
                //     if (key === 'attachments') {
                //         formData.attachments.forEach(file => {
                //             formDataToSend.append('attachments', file)
                //         });
                //     } else {
                //         console.log('key',formData[key],key)
                //         formDataToSend.append(key, formData[key])
                //     }
                // }
                console.log('formData', formData)
                // const response = await fetch('http://localhost:5000/jobs/create', {
                //     method: 'POST',
                //     body: formDataToSend,
                // });
                // if (response.ok) {
                //     console.log('Data saved successfully');
                //     const successMessage = formData.type === 'Internship' ? 'The internship post is being validated by the admin' : 'The job post is being validated by the admin';
                //     toast.success(successMessage);
                //     props.onHide();
                // } else {
                //     const errorData = await response.json();
                //     console.error('Failed to save data', errorData);
                // }
            } catch (error) {
                console.error('Error:', error);
            }
            setLoading(false);
        };
        // const handleCheckboxChange = (e) => {
        //     const { name, checked } = e.target;
        //     if (name === 'isJob' && checked) {
        //         setIsJobChecked(true);
        //         setIsInternshipChecked(false);
        //         setFormData(prevFormData => ({
        //             ...prevFormData,
        //             type: 'Job',
        //         }));
        //     } else if (name === 'isInternship' && checked) {
        //         setIsInternshipChecked(true);
        //         setIsJobChecked(false);
        //         setFormData(prevFormData => ({
        //             ...prevFormData,
        //             type: 'Internship',
        //             employmentType: 'Internship'
        //         }));
        //     }
        //     setFormError('');
        // };

        // const handleCheckboxChange = (e) => {
        //     const { name, checked } = e.target;
        //     switch (name) {
        //         case 'isJob':
        //             setIsJobChecked(checked);
        //             setIsInternshipChecked(false); // Ensure internship is not checked if job is checked
        //             setFormData(prevFormData => ({
        //                             ...prevFormData,
        //                             type: 'Job',
        //                         }));
        //             break;
        //         case 'isInternship':
        //             setIsInternshipChecked(checked);
        //             setIsJobChecked(false); // Ensure job is not checked if internship is checked
        //             // Reset Paid and Unpaid states when Internship is unchecked
        //             setFormData(prevFormData => ({
        //                             ...prevFormData,
        //                             type: 'Internship',
        //                             employmentType: 'Internship'
        //                         }));
        //             if (!checked) {
        //                 setIsPaid(false);
        //                 setIsUnpaid(false);
        //             }
        //             break;
        //         case 'paid':
        //             if (isInternshipChecked) { // Only allow changing paid/unpaid if internship is checked
        //                 setIsPaid(checked);
        //                 setIsUnpaid(!checked);
        //             }
        //             break;
        //         case 'unpaid':
        //             if (isInternshipChecked) { // Only allow changing paid/unpaid if internship is checked
        //                 setIsUnpaid(checked);
        //                 setIsPaid(!checked);
        //             }
        //             break;
        //         default:
        //             break;
        //     }
        //     setFormError('');
        // };
        const handleCheckboxChange = (e) => {
            const { name, checked } = e.target;
            switch (name) {
                case 'isJob':
                    setIsJobChecked(checked);
                    setIsInternshipChecked(!checked);
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        type: checked ? 'Job' : '',
                        salaryMin: checked ? prevFormData.salaryMin : '',
                        salaryMax: checked ? prevFormData.salaryMax : '',
                    }));
                    break;
                case 'isInternship':
                    setIsInternshipChecked(checked);
                    setIsJobChecked(!checked);
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        type: checked ? 'Internship' : '',
                        salaryMin: !checked ? '' : prevFormData.salaryMin,
                        salaryMax: !checked ? '' : prevFormData.salaryMax,
                    }));
                    if (!checked) {
                        setIsPaid(false);
                        setIsUnpaid(false);
                    }
                    break;
                case 'paid':
                    setIsPaid(checked);
                    setIsUnpaid(!checked);
                    if (isInternshipChecked ) {
                        console.log("paid")
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            salaryMin: checked ? prevFormData.salaryMin : '',
                            salaryMax: checked ? prevFormData.salaryMax : '',
                        }));
                    }
                    break;
                case 'unpaid':
                    setIsUnpaid(checked);
                    setIsPaid(!checked);
                    if (isInternshipChecked || formData.employmentType === 'Volunteer') {
                        console.log("unpaid")
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            salaryMin: '',
                            salaryMax: '',
                        }));
                    }
                    break;
                default:
                    break;
            }
            setFormError('');
        };
        

        const [isPaid1, setIsPaid1] = useState(false);
        const [isUnpaid1, setIsUnpaid1] = useState(false);
        const [isPaid, setIsPaid] = useState(false);
        const [isUnpaid, setIsUnpaid] = useState(false);
        const handleCheckboxChange1 = (e) => {
            const { name, checked } = e.target;
            if (formData.employmentType === 'Volunteer') {
                if (name === 'paid') {
                    setIsPaid1(checked);
                    setIsUnpaid1(!checked); // Uncheck "Unpaid" if "Paid" is checked
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        salaryMin: checked ? prevFormData.salaryMin : '',
                        salaryMax: checked ? prevFormData.salaryMax : '',
                    }));
                } else if (name === 'unpaid') {
                    setIsUnpaid1(checked);
                    setIsPaid1(!checked); // Uncheck "Paid" if "Unpaid" is checked
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        salaryMin: '',
                        salaryMax: '',
                    }));
                }
            }
        };

          const [selectedEmploymentType1, setSelectedEmploymentType1] = useState('');
          const handleEmploymentTypeSelect = (eventKey) => {
            setSelectedEmploymentType1(eventKey);
          };
          const isSalaryFieldDisabled = (formData.employmentType === 'Volunteer' && !isPaid) || (isInternshipChecked && !isPaid);

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create a Job/Internship post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <Row>
                            <Col>
                                <Form.Group as={Col} >
                                    <Form.Label htmlFor="job">Title</Form.Label>
                                    <Form.Control
                                        id="job"
                                        type="text"
                                        placeholder="Enter job/internship title"
                                        name='title'
                                        value={formData.title}
                                        onChange={handleInputChange}

                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Col} controlId="location">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            
                                <Form.Group controlId="salaryRange">
                                    <Form.Label>Salary Range</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Minimum"
                                        name="salaryMin"
                                        className='mb-2'
                                        value={formData.salaryMin}
                                        onChange={handleInputChange}
                                        disabled={isSalaryFieldDisabled}
                                    />
                                    To
                                    <Form.Control
                                        type="text"
                                        placeholder="Maximum"
                                        name="salaryMax"
                                        className='mt-2'
                                        value={formData.salaryMax}
                                        onChange={handleInputChange}
                                        disabled={isSalaryFieldDisabled}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="currency">
                                    <Form.Label>Currency</Form.Label>
                                    <DropdownButton
                                        id="createJob-currency-dropdown"
                                        title={formData.currency}
                                        style={{ marginTop: '0px' }}
                                        onSelect={(eventKey) => {
                                            setFormData(prevFormData => ({
                                                ...prevFormData,
                                                currency: eventKey,
                                            }));
                                        }}
                                    >
                                        <div className="scrollable-dropdown">
                                            <Dropdown.Item eventKey="INR">INR</Dropdown.Item>
                                            <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
                                            <Dropdown.Item eventKey="JPY">JPY</Dropdown.Item>
                                            <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
                                            <Dropdown.Item eventKey="GBP">GBP</Dropdown.Item>
                                        </div>
                                    </DropdownButton>
                                </Form.Group>
                                <Form.Group controlId="wages">
                                    <Form.Label style={{ marginBottom: '0px' }}>Wages</Form.Label>
                                    <DropdownButton
                                        id="createJob-timings-dropdown"
                                        title={formData.duration}
                                        style={{ marginTop: '0px' }}
                                        onSelect={(eventKey) => {
                                            setFormData(prevFormData => ({
                                                ...prevFormData,
                                                duration: eventKey,
                                            }));
                                        }}
                                    >
                                        <div className="scrollable-dropdown">
                                            <Dropdown.Item eventKey="per hour">per hour</Dropdown.Item>
                                            <Dropdown.Item eventKey="per week">per week</Dropdown.Item>
                                            <Dropdown.Item eventKey="per month">per month</Dropdown.Item>
                                            <Dropdown.Item eventKey="per year">per year</Dropdown.Item>
                                        </div>
                                    </DropdownButton>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="job-internship">
                            <Form.Check
                                type='checkbox'
                                id='job-checkbox'
                                label='Job'
                                name='isJob'
                                checked={formData.type === 'Job'}
                                onChange={handleCheckboxChange}
                            />
                            <Form.Check
                                type='checkbox'
                                id='internship-checkbox'
                                label='Internship'
                                name='isInternship'
                                checked={formData.type === 'Internship'}
                                onChange={handleCheckboxChange}
                            />
                            {isInternshipChecked && ( // Conditionally render Paid and Unpaid checkboxes
        <>
        <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center',color:'red' ,gap:'10px'}}>
            <Form.Check
                type="checkbox"
                id="paid"
                label="Paid"
                name="paid"
                checked={isPaid}
                onChange={handleCheckboxChange}
            />
            <Form.Check
                type="checkbox"
                id="unpaid"
                label="Unpaid"
                name="unpaid"
                checked={isUnpaid}
                onChange={handleCheckboxChange}
            />
            </div>
        </>
    )}
                            {formError && <div className="text-danger">{formError}</div>}
                        </Form.Group>
                        <Form.Group controlId="employmentType">
                            <Form.Label>Employment Type</Form.Label>
                            <DropdownButton
                            //     id="createEmployment-type-dropdown"
                            //     title={formData.employmentType}
                            //     disabled={!isJobChecked}
                            //     onSelect={(eventKey) => {
                            //         setFormData((prevFormData) => ({
                            //             ...prevFormData,
                            //             employmentType: eventKey,
                            //         }));
                            //     }}
                            //      onSelect={handleEmploymentTypeSelect}
                            // >
                            id="createEmployment-type-dropdown"
  title={formData.employmentType}
  disabled={!isJobChecked}
  onSelect={(eventKey) => {
    // First action: Update your form data state
    setFormData((prevFormData) => ({
      ...prevFormData,
      employmentType: eventKey,
    }));

    // Second action: Call the handleEmploymentTypeSelect function with the eventKey
    handleEmploymentTypeSelect(eventKey);
  }}
>
                                <div className="scrollable-dropdown">
                                    <Dropdown.Item eventKey="Full-time" >Full-time</Dropdown.Item>
                                    <Dropdown.Item eventKey="Part-time" >Part-time</Dropdown.Item>
                                    <Dropdown.Item eventKey="Volunteer" >Volunteer</Dropdown.Item>
                                    <Dropdown.Item eventKey="Contract" >Contract</Dropdown.Item>
                                </div>
                            </DropdownButton>
                            {selectedEmploymentType1 === 'Volunteer' && (
        <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center',color:'red' }}>
          <Form.Check
            type="checkbox"
            id="paid"
            label="Paid"
            name="paid"
            checked={isPaid1}
            onChange={handleCheckboxChange1}
          />
          <Form.Check
            type="checkbox"
            id="unpaid"
            label="Unpaid"
            name="unpaid"
            checked={isUnpaid1}
            onChange={handleCheckboxChange1}
            style={{ marginLeft: '10px' }}
          />
        </div>
      )}
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <DropdownButton
                                id="createJob-categories-dropdown"
                                title={formData.category}
                                onSelect={(eventKey) => {
                                    setFormData(prevFormData => ({
                                        ...prevFormData,
                                        category: eventKey,
                                    }));
                                }}
                            >
                                <div className="scrollable-dropdown">
                                    <Dropdown.Item eventKey="Other" >Other</Dropdown.Item>
                                    <Dropdown.Item eventKey="Admin & Office" >Admin & Office</Dropdown.Item>
                                    <Dropdown.Item eventKey="Art & Design" >Art & Design</Dropdown.Item>
                                    <Dropdown.Item eventKey="Business Operations" >Business Operations</Dropdown.Item>
                                    <Dropdown.Item eventKey="Cleaning & Facilities" >Cleaning & Facilities</Dropdown.Item>
                                    <Dropdown.Item eventKey="Community & Social Services" >Community & Social Services</Dropdown.Item>
                                    <Dropdown.Item eventKey="Computer & Data" >Computer & Data</Dropdown.Item>
                                    <Dropdown.Item eventKey="Construction & Mining" >Construction & Mining</Dropdown.Item>
                                    <Dropdown.Item eventKey="Education" >Education</Dropdown.Item>
                                    <Dropdown.Item eventKey="Farming & Forestry">Farming & Forestry</Dropdown.Item>
                                    <Dropdown.Item eventKey="Healthcare">Healthcare</Dropdown.Item>
                                    <Dropdown.Item eventKey="Installation,Maintenance & Repair">Installation,Maintenance & Repair</Dropdown.Item>
                                    <Dropdown.Item eventKey="Legal">Legal</Dropdown.Item>
                                    <Dropdown.Item eventKey="Management" >Management</Dropdown.Item>
                                    <Dropdown.Item eventKey="Manufacturing" >Manufacturing</Dropdown.Item>
                                    <Dropdown.Item eventKey="Media & Communication">Media & Communication</Dropdown.Item>
                                    <Dropdown.Item eventKey="Personal Care" >Personal Care</Dropdown.Item>
                                    <Dropdown.Item eventKey="Protective Services" >Protective Services</Dropdown.Item>
                                    <Dropdown.Item eventKey="Restaurants & Hospitality" >Restaurants & Hospitality</Dropdown.Item>
                                    <Dropdown.Item eventKey="Retail & Sales" >Retail & Sales</Dropdown.Item>
                                    <Dropdown.Item eventKey="Science & Engineering">Science & Engineering</Dropdown.Item>
                                    <Dropdown.Item eventKey="Sports & Entertainment">Sports & Entertainment</Dropdown.Item>
                                    <Dropdown.Item eventKey="Transportation" >Transportation</Dropdown.Item>
                                </div>
                            </DropdownButton>
                        </Form.Group>
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <CustomToggle eventKey="1" style={{ padding: '10px' }}>Add a question</CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body><Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter question"
                                        name="questions"
                                        value={formData.questions}
                                        onChange={handleInputChange}
                                    /></Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder={`Enter ${formData.type.toLowerCase()} description`}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="coverImage">
                            <Form.Label>Add cover image</Form.Label>
                            <input className='form-control' type="file" onChange={handleCoverImageChange} accept=".jpg, .jpeg, .png, .pdf" />
                        </Form.Group>
                        <Form.Group controlId="attachments">
                            <Form.Label>Add attachments</Form.Label>
                            <input className='form-control' type="file" onChange={handleImageChange} multiple accept=".jpg, .jpeg, .png, .pdf" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button onClick={handlePublish}>{loading ? 'Publishing...' : 'Publish'}</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const generateTitle = () => {
        let title = props.title;
        let categoryTitle = selectedCategory !== 'All' ? selectedCategory : 'Categories';
        let jobTypeTitle = selectedEmploymentType !== 'All' ? selectedEmploymentType : `Employment Type`;

        return { categoryTitle, jobTypeTitle };
    };


    return (
        <>  <div className="jobs-page" style={{ width: '100%' }}>
            <div className="jobs-title">
                <p>{title}</p>
                <p>Search, find and apply to {title} opportunities at Alumni Portal</p>
                <div className="centered-content">
                    <div className="jobs-search-box">
                        <div className="jobs-card">
                            <div className="card-body">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" onChange={(e) => handleSearchChange(e, e.target.value, 'text')} placeholder={`Search for jobs/internships`} />
                                    </Form.Group>
                                </Form>
                                <div className="jobs-dropdowns" style={{ fontSize: '15px' }}>
                                    <DropdownButton id="job-type-dropdown" onSelect={(selectedOption) => handleSearchChange('', selectedOption, 'employmentType')} title={generateTitle().jobTypeTitle} className="custom-dropdown">
                                        <div className="scrollable-dropdown">
                                            <Dropdown.Item eventKey="">Employment Type</Dropdown.Item>
                                            <Dropdown.Item eventKey="Full-time">Full-time</Dropdown.Item>
                                            <Dropdown.Item eventKey="Part-time">Part-time</Dropdown.Item>
                                            <Dropdown.Item eventKey="Internship">Internship</Dropdown.Item>
                                            <Dropdown.Item eventKey="Volunteer">Volunteer</Dropdown.Item>
                                            <Dropdown.Item eventKey="Contract">Contract</Dropdown.Item>
                                        </div>
                                    </DropdownButton>
                                    <DropdownButton style={{ fontSize: '15px' }} id="categories-dropdown" onSelect={(selectedOption) => handleSearchChange('', selectedOption, 'category')} title={generateTitle().categoryTitle} className="custom-dropdown">
                                        <div className="scrollable-dropdown">
                                            <Dropdown.Item eventKey="">Category</Dropdown.Item>
                                            <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                                            <Dropdown.Item eventKey="Admin & Office">Admin & Office</Dropdown.Item>
                                            <Dropdown.Item eventKey="Art & Design">Art & Design</Dropdown.Item>
                                            <Dropdown.Item eventKey="Business Operations">Business Operations</Dropdown.Item>
                                            <Dropdown.Item eventKey="Cleaning & Facilities">Cleaning & Facilities</Dropdown.Item>
                                            <Dropdown.Item eventKey="Community & Social Services">Community & Social Services</Dropdown.Item>
                                            <Dropdown.Item eventKey="Computer & Data">Computer & Data</Dropdown.Item>
                                            <Dropdown.Item eventKey="Construction & Mining">Construction & Mining</Dropdown.Item>
                                            <Dropdown.Item eventKey="Education">Education</Dropdown.Item>
                                            <Dropdown.Item eventKey="Farming & Forestry">Farming & Forestry</Dropdown.Item>
                                            <Dropdown.Item eventKey="Healthcare">Healthcare</Dropdown.Item>
                                            <Dropdown.Item eventKey="Installation,Maintenance & Repair">Installation,Maintenance & Repair</Dropdown.Item>
                                            <Dropdown.Item eventKey="Legal">Legal</Dropdown.Item>
                                            <Dropdown.Item eventKey="Management">Management</Dropdown.Item>
                                            <Dropdown.Item eventKey="Manufacturing">Manufacturing</Dropdown.Item>
                                            <Dropdown.Item eventKey="Media & Communication">Media & Communication</Dropdown.Item>
                                            <Dropdown.Item eventKey="Personal Care">Personal Care</Dropdown.Item>
                                            <Dropdown.Item eventKey="Protective Services">Protective Services</Dropdown.Item>
                                            <Dropdown.Item eventKey="Restaurants & Hospitality">Restaurants & Hospitality</Dropdown.Item>
                                            <Dropdown.Item eventKey="Retail & Sales">Retail & Sales</Dropdown.Item>
                                            <Dropdown.Item eventKey="Science & Engineering">Science & Engineering</Dropdown.Item>
                                            <Dropdown.Item eventKey="Sports & Entertainment">Sports & Entertainment</Dropdown.Item>
                                            <Dropdown.Item eventKey="Transportation">Transportation</Dropdown.Item>
                                        </div>
                                    </DropdownButton>
                                    {profile.profileLevel === 2 && (
                                        <Button variant="danger" onClick={() => setModalShow(true)}>
                                            Create a job/internship
                                        </Button>
                                    )}

                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default IntJobs;