import { useState } from "react"
import { useDispatch } from "react-redux";
import { Grid, Paper, Typography, TextField, Button, Tooltip } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';

export default function ResourceForm({ stages, organizations, entrepreneur, funding, support }) {

    const dispatch = useDispatch();

    // State for new resource input fields using useState hook
    // const [newResource, setNewResource] = useState({
    //     name: '',
    //     image_url: '',
    //     description: '',
    //     website: '',
    //     email: '',
    //     address: '',
    //     linkedin: '',
    //     organization_id: '',
    //     stage_id: '',
    //     entrepreneur_id: '',
    //     support: [],
    //     funding: [],
    // });

    const [newName, setNewName] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newWebsite, setNewWebsite] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newLinkedIn, setNewLinkedIn] = useState('')
    const [newOrganization, setNewOrganization] = useState('')
    const [newStage, setNewStage] = useState('')
    const [newEntrepreneur, setNewEntrepreneur] = useState(null)
    const [newSupport1, setNewSupport1] = useState('')
    const [newSupport2, setNewSupport2] = useState('')
    const [newSupport3, setNewSupport3] = useState('')
    const [newFunding1, setNewFunding1] = useState('')
    const [newFunding2, setNewFunding2] = useState('')
    const [newFunding3, setNewFunding3] = useState('')

    // Regular expression for URL validation
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    const isValidImageUrl = (url) => {
        // A simple check to see if the URL ends with common image file extensions
        // Note: This is not a foolproof check
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    };

    // handleSubmit is a function that validates newResource input fields and dispatches a new resource
    const handleSubmit = (event) => {
        // prevent default form submission
        event.preventDefault();

        const supportArr = []
        const fundingArr = []

        //this is really gross but we need to get this done lol
        if (newSupport1) {
            supportArr.push(newSupport1)
        }
        if (newSupport2) {
            supportArr.push(newSupport2)
        }
        if (newSupport3) {
            supportArr.push(newSupport3)
        }
        if (newFunding1) {
            fundingArr.push(newFunding1)
        }
        if (newFunding2) {
            fundingArr.push(newFunding2)
        }
        if (newFunding3) {
            fundingArr.push(newFunding3)
        }

        // Validate the LinkedIn URL
        if (newLinkedIn !== '' && !urlRegex.test(newLinkedIn)) {
            alert('Invalid LinkedIn URL');
            return;
        }

        // Validate the Website URL
        if (newWebsite !== '' && !urlRegex.test(newWebsite)) {
            alert('Invalid Website URL');
            return;
        }

        // Validate the Image URL
        if (newImage && !isValidImageUrl(newImage)) {
            alert('Invalid Image URL');
            return;
        }

        // If all fields are properly filled out, dispatch action to save new resource
        if (newName && newDescription && newStage && newOrganization && (supportArr || fundingArr)) {
            const newResource = {
                name: newName,
                image_url: newImage,
                description: newDescription,
                website: newWebsite,
                email: newEmail,
                address: newAddress,
                linkedin: newLinkedIn,
                organization_id: newOrganization,
                stage_id: newStage,
                entrepreneur_id: newEntrepreneur,
                support: supportArr,
                funding: fundingArr
            }
            dispatch({ type: 'POST_RESOURCE', payload: newResource });
            setNewName('');
            setNewDescription('');
            setNewImage('');
            setNewWebsite('');
            setNewLinkedIn('');
            setNewEmail('');
            setNewAddress('');
            setNewOrganization('');
            setNewStage('');
            setNewEntrepreneur('');
            setNewSupport1('');
            setNewSupport2('');
            setNewSupport3('');
            setNewFunding1('');
            setNewFunding2('');
            setNewFunding3('');
        } else {
            // Display a validation error message or take appropriate action
            alert('Please provide all mandatory fields (name, description, stage, and organization).');
        }
    };

    return (
        <Grid item xs={9}>
            <Paper style={{ marginBottom: '50px' }} className="admin-container">
                {/* Information about the form is displayed here */}
                <Typography variant="h6" component="h6" style={{ marginBottom: '20px', textAlign: 'center', color: '#55c6f0' }}>
                    Contribute Resource
                    {/* The Tooltip component is used here to provide additional information about the form */}
                    <Tooltip title="This form allows the addition of new resources. Complete all required fields with accurate information. After confirming details, click 'Submit' for user availability.">
                        <InfoIcon style={{ marginLeft: '10px' }} color="action" />
                    </Tooltip>
                </Typography>
                {/* Form to add a new resource */}
                <form className='admin-form' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                    <Grid item container spacing={1} xs={12}>
                        <Grid item xs={5}>
                            <TextField
                                label="Name"
                                fullWidth
                                value={newName}
                                // Updates the 'name' property of the 'newResource' state when the input value changes
                                onChange={(event) => setNewName(event.target.value)}
                                required // This makes the field mandatory
                            />
                        </Grid>

                        <Grid item xs={7}>
                            <TextField
                                label="Image URL"
                                fullWidth
                                value={newImage}
                                // Updates the 'image_url' property of the 'newResource' state when the input value changes
                                onChange={(event) => setNewImage(event.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            sx={{ my: 1 }}
                            label="Description"
                            multiline
                            fullWidth
                            rows={3}
                            value={newDescription}
                            // Updates the 'description' property of the 'newResource' state when the input value changes
                            onChange={(event) => setNewDescription(event.target.value)}
                            required // This makes the field mandatory
                        />
                    </Grid>


                    <Grid item container spacing={1} xs={12}>
                        <Grid item xs={3} sx={{ mb: 1 }}>
                            <TextField
                                label="LinkedIn"
                                value={newLinkedIn}
                                // Updates the 'linkedin' property of the 'newResource' state when the input value changes
                                onChange={(event) => setNewLinkedIn(event.target.value)}
                                // Validate the LinkedIn URL using the regex
                                // A valid LinkedIn URL starts with "https://www.linkedin.com/"
                                error={!urlRegex.test(newLinkedIn) && newLinkedIn !== ''}
                                helperText={newLinkedIn !== '' && !urlRegex.test(newLinkedIn) ? 'Invalid LinkedIn URL' : ''}
                            />
                        </Grid>

                        <Grid item xs={3} sx={{ mb: 1 }}>
                            <TextField
                                label="Website"
                                value={newWebsite}
                                // Updates the 'website' property of the 'newResource' state when the input value changes
                                onChange={(event) => setNewWebsite(event.target.value)}
                                // Validate the Website URL using the regex
                                // A valid Website URL starts with "http://" or "https://"
                                error={!urlRegex.test(newWebsite) && newWebsite !== ''}
                                helperText={newWebsite !== '' && !urlRegex.test(newWebsite) ? 'Invalid Website URL' : ''}
                            />
                        </Grid>

                        <Grid item xs={3} sx={{ mb: 1 }}>
                            <TextField
                                label="Email"
                                type="email"
                                value={newEmail}
                                // Updates the 'email' property of the 'newResource' state when the input value changes
                                onChange={(event) => setNewEmail(event.target.value)}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Regular expression for email validation
                            />
                        </Grid>

                        <Grid item xs={3} sx={{ mb: 1 }}>
                            <TextField
                                label="Address"
                                value={newAddress}
                                // Updates the 'address' property of the 'newResource' state when the input value changes
                                onChange={(event) => setNewAddress(event.target.value)}
                            />
                        </Grid>
                    </Grid>


                    <Grid item container spacing={1} xs={12}>
                        <Grid item xs={4}>
                            <TextField
                                select
                                fullWidth
                                value={newOrganization}
                                // Updates the 'organization' property of the 'newResource' state when the input value changes
                                SelectProps={{
                                    native: true,
                                }}
                                onChange={(event) => setNewOrganization(event.target.value)}
                                required // This makes the field mandatory
                            >
                                <option value={0}>Select organization type</option>
                                {organizations.map((organization) => (
                                    <option key={organization.id} value={organization.id}>
                                        {organization.name}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={4}>
                            {/* This is a form select input for choosing a resource stage. */}
                            <TextField
                                select
                                fullWidth
                                value={newStage}
                                SelectProps={{
                                    native: true,
                                }}
                                // Updates the 'organization_id' property of the 'newResource' state when the selected value changes
                                onChange={(event) => setNewStage(event.target.value)}
                                required // This makes the field mandatory
                            >
                                {/* A default option prompting the user to select a stage */}
                                <option value={0}>Select business stage</option>
                                {/* Mapping over the 'stages' array to create an option for each stage */}
                                {stages.map((stage) => (
                                    <option key={stage.id} value={stage.id}>
                                        {stage.name}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                select
                                fullWidth
                                value={newEntrepreneur}
                                SelectProps={{
                                    native: true,
                                }}
                                // Updates the 'organization_id' property of the 'newResource' state when the selected value changes
                                onChange={(event) => setNewEntrepreneur(event.target.value)}
                            >
                                {/* A default option prompting the user to select a stage */}
                                <option value={0}>Select entrepreneur type</option>
                                {/* Mapping over the 'entrepreneur' array to create an option for each stage */}
                                {entrepreneur.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.title}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid >


                    <Grid item container xs={12} spacing={1}>
                        <Grid item container xs={6}>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ mt: 1 }}
                                    select
                                    fullWidth
                                    value={newSupport1}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    // Updates the 'support' property of the 'newResource' state when the selected value changes
                                    onChange={(e) => setNewSupport1(e.target.value)}
                                >
                                    {/* A default option prompting the user to select a stage */}
                                    <option value={0}>Select support type (optional)</option>
                                    {/* Mapping over the 'support' array to create an option for each stage */}
                                    {support.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.title}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    sx={{ mt: 1 }}
                                    select
                                    fullWidth
                                    value={newSupport2}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    // Updates the 'support' property of the 'newResource' state when the selected value changes
                                    onChange={(e) => setNewSupport2(e.target.value)}
                                >
                                    {/* A default option prompting the user to select a stage */}
                                    <option value={0}>Select support type (optional)</option>
                                    {/* Mapping over the 'support' array to create an option for each stage */}
                                    {support.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.title}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    sx={{ mt: 1 }}
                                    select
                                    fullWidth
                                    value={newSupport3}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    // Updates the 'support' property of the 'newResource' state when the selected value changes
                                    onChange={(e) => setNewSupport3(e.target.value)}
                                >
                                    {/* A default option prompting the user to select a stage */}
                                    <option value={0}>Select support type (optional)</option>
                                    {/* Mapping over the 'support' array to create an option for each stage */}
                                    {support.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.title}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>


                        <Grid item container xs={6}>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ mt: 1 }}
                                    select
                                    fullWidth
                                    value={newFunding1}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    // Updates the 'funding' property of the 'newResource' state when the selected value changes
                                    onChange={(e) => setNewFunding1(e.target.value)}
                                >
                                    {/* A default option prompting the user to select a stage */}
                                    <option value={0}>Select funding type (optional) </option>
                                    {/* Mapping over the 'funding' array to create an option for each stage */}
                                    {funding.map((f) => (
                                        <option key={f.id} value={f.id}>
                                            {f.title}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    sx={{ mt: 1 }}
                                    select
                                    fullWidth
                                    value={newFunding2}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    // Updates the 'funding' property of the 'newResource' state when the selected value changes
                                    onChange={(e) => setNewFunding2(e.target.value)}
                                >
                                    {/* A default option prompting the user to select a stage */}
                                    <option value={0}>Select funding type (optional)</option>
                                    {/* Mapping over the 'funding' array to create an option for each stage */}
                                    {funding.map((f) => (
                                        <option key={f.id} value={f.id}>
                                            {f.title}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    sx={{ mt: 1 }}
                                    select
                                    fullWidth
                                    value={newFunding3}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    // Updates the 'funding' property of the 'newResource' state when the selected value changes
                                    onChange={(e) => setNewFunding3(e.target.value)}
                                >
                                    {/* A default option prompting the user to select a stage */}
                                    <option value={0}>Select funding type (optional)</option>
                                    {/* Mapping over the 'funding' array to create an option for each stage */}
                                    {funding.map((f) => (
                                        <option key={f.id} value={f.id}>
                                            {f.title}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Button sx={{ mt: 1 }} variant="contained" color="primary" type="submit">
                        Add Resource
                    </Button>
                </form >
            </Paper >
        </Grid >
    )
}