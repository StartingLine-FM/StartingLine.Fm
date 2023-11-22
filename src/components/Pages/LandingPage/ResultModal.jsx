// hook imports
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// MUI
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    TextField,
    IconButton,
    Link,
    Chip,
} from '@mui/material';
// MUI Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

export default function ResultModal({ open, handleClose, hit, userPostTodo, anonPostTodo }) {
    console.log('hits are', { hit });

    // local state
    // admin edit state
    const [editMode, setEditMode] = useState(false);
    // resource keys for admin edit
    const [newName, setNewName] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newWebsite, setNewWebsite] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newLinkedIn, setNewLinkedIn] = useState('')
    const [newOrganization, setNewOrganization] = useState('');
    const [newStage, setNewStage] = useState('');
    const [newEntrepreneur, setNewEntrepreneur] = useState('');
    //Multi tag madness 
    const [newSupport1, setNewSupport1] = useState(hit.support ? hit.support[0] ? hit.support[0].id : null : null);
    const [newSupport2, setNewSupport2] = useState(hit.support ? hit.support[1] ? hit.support[1].id : null : null);
    const [newSupport3, setNewSupport3] = useState(hit.support ? hit.support[2] ? hit.support[2].id : null : null);
    const [updatedSupportJoin1, setUpdatedSupportJoin1] = useState(null);
    const [updatedSupportJoin2, setUpdatedSupportJoin2] = useState(null);
    const [updatedSupportJoin3, setUpdatedSupportJoin3] = useState(null);

    const [newFunding1, setNewFunding1] = useState(hit.funding ? hit.funding[0] ? hit.funding[0].id : null : null);
    const [newFunding2, setNewFunding2] = useState(hit.funding ? hit.funding[1] ? hit.funding[1].id : null : null);
    const [newFunding3, setNewFunding3] = useState(hit.funding ? hit.funding[2] ? hit.funding[2].id : null : null);
    const [updatedFundingJoin1, setUpdatedFundingJoin1] = useState(null);
    const [updatedFundingJoin2, setUpdatedFundingJoin2] = useState(null);
    const [updatedFundingJoin3, setUpdatedFundingJoin3] = useState(null);



    // Redux
    const user = useSelector(store => store.user);
    const todoResources = useSelector(store => store.todoListResourcesReducer);
    const organizations = useSelector(store => store.organizations);
    const stages = useSelector(store => store.stages);
    const funding = useSelector(store => store.funding);
    const support = useSelector(store => store.support);
    const entrepreneur = useSelector(store => store.entrepreneur);
    const dispatch = useDispatch();

    // click handler for saving our admin edit changes
    const putResource = () => {

        const supportArray = []
        const fundingArray = []

        const buildSupportArray = () => {

            newSupport1
                ? updatedSupportJoin1
                    ? supportArray.push({ support_id: newSupport1, support_join_id: updatedSupportJoin1 })
                    : supportArray.push({ support_id: newSupport1 })
                : null;

            newSupport2
                ? updatedSupportJoin2
                    ? supportArray.push({ support_id: newSupport2, support_join_id: updatedSupportJoin2 })
                    : supportArray.push({ support_id: newSupport2 })
                : null;

            newSupport3
                ? updatedSupportJoin3
                    ? supportArray.push({ support_id: newSupport3, support_join_id: updatedSupportJoin3 })
                    : supportArray.push({ support_id: newSupport3 })
                : null;

            console.log(supportArray)
        }

        buildSupportArray();

        // Instantiate payload keys
        const payload = {
            id: hit.objectID,
            name: newName || hit.name,
            image_url: newImage || hit.image_url,
            description: newDescription || hit.description,
            website: newWebsite || hit.website,
            email: newEmail || hit.email,
            address: newAddress || hit.address,
            linkedin: newLinkedIn || hit.linkedin,
            organization_id: newOrganization || hit.organization_id,
            stage_id: newStage || hit.stage_id,
            entrepreneur_id: newEntrepreneur || hit.entrepreneur_id,
            // Include support and funding arrays in the payload
            support: supportArray,
            funding: [
                { funding_id: newFunding1, funding_join_id: updatedFundingJoin1 },
                { funding_id: newFunding2, funding_join_id: updatedFundingJoin2 },
                { funding_id: newFunding3, funding_join_id: updatedFundingJoin3 },
            ],
        };

        console.log('Update Resource Payload:', payload);

        // Send dispatch to update resource
        dispatch({
            type: "UPDATE_RESOURCE",
            payload,
        });

        // Clear all inputs
        clearInputs();

        // Close dialog box
        handleClose();
    };





    // function to clear state for all admin edit fields
    const clearInputs = () => {
        setNewName('');
        setNewImage('');
        setNewDescription('');
        setNewWebsite('');
        setNewEmail('');
        setNewAddress('');
        setNewLinkedIn('');
        setNewOrganization('');
        setNewStage('');
        setEditMode(false);
    }

    // click handler for admin to delete a resource
    const deleteResource = () => {

        dispatch({
            type: "DELETE_RESOURCE",
            payload: hit.objectID
        })

        // close dialog
        handleClose();
    }

    //console log useEffects
    useEffect(() => {
        dispatch({ type: 'FETCH_ORGANIZATIONS' });
        // console.log('Organizations:', organizations);
    }, []);

    useEffect(() => {
        dispatch({ type: 'FETCH_SUPPORT' });
        // console.log('Support:', support);
    }, []);

    useEffect(() => {
        dispatch({ type: 'FETCH_FUNDING' });
        // console.log('Funding:', funding);
    }, []);

    useEffect(() => {
        dispatch({ type: 'FETCH_ENTREPRENEUR' });
        // console.log('Entrepreneur:', entrepreneur);
    }, []);


    return (
        editMode
            // If in Edit Mode, show the following:
            ? <Dialog open={open} onClose={handleClose} >
                {/* Save and Close buttons */}
                <DialogActions>
                    <IconButton onClick={putResource} >
                        <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => { handleClose(), clearInputs() }} >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                {/* Text fields for edit mode */}
                <DialogTitle>Edit entry for {hit.name}</DialogTitle>
                <DialogContent sx={{ pt: 1, mt: 1 }}>
                    {/* Name edit: set to populate current Name to be edited */}
                    <TextField
                        label="Edit Name"
                        sx={{ m: 1 }}
                        value={newName || hit.name}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    {/* Description edit: set to populate current Description to be edited */}
                    <TextField
                        sx={{ m: 1, width: "50%" }}
                        label={hit.description ? "Edit Description" : 'Add description'}
                        value={newDescription || hit.description}
                        onChange={(e) => setNewDescription(e.target.value)}
                        multiline
                        rows={3}
                        maxLength="1000"
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={hit.website ? "Edit Website" : 'Add website url'}
                        value={newWebsite || hit.website}
                        onChange={(e) => setNewWebsite(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={hit.email ? "Edit Email" : 'Add email'}
                        value={newEmail || hit.email}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={hit.linkedin ? "Edit LinkedIn" : 'Add LinkedIn url'}
                        value={newLinkedIn || hit.linkedin}
                        onChange={(e) => setNewLinkedIn(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={hit.address ? "Edit Address" : 'Add address'}
                        value={newAddress || hit.address}
                        onChange={(e) => setNewAddress(e.target.value)}
                    />
                    {/* Image URL is the only field that doesn't populate the current value by default,
                    mostly because this is the only text input where the user would more likely to be replacing
                    the whole input instead of just editing parts of it */}
                    <TextField
                        sx={{ m: 1 }}
                        label={hit.image_url ? hit.image_url : 'Add Image URL'}
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                    />
                    {/* Organization edit dropdown */}
                    <TextField
                        sx={{ m: 1, width: '20ch' }}
                        select
                        defaultValue={hit.organization_id}
                        SelectProps={{
                            native: true,
                        }}
                        label="Select Organization"
                        onChange={e => setNewOrganization(e.target.value)}
                    >
                        {organizations &&
                            organizations.map(org => (
                                <option key={org.id} value={org.name}>
                                    {org.name}
                                </option>
                            ))}
                    </TextField>
                    <br />

                    {/* Stage edit dropdown */}
                    <TextField
                        sx={{ m: 1, width: '20ch' }}
                        select
                        defaultValue={hit.stage_id}
                        SelectProps={{
                            native: true,
                        }}
                        label="Edit Business Stage"
                        onChange={e => setNewStage(e.target.value)}>
                        {stages &&
                            stages.map(s => {
                                return (
                                    <option value={s.id}>{s.name}</option>
                                );
                            })}
                    </TextField>

                    {/* Entrepreneur edit dropdown */}
                    <TextField
                        sx={{ m: 1, width: '20ch' }}
                        select
                        defaultValue={hit.entrepreneur_id || null}
                        SelectProps={{
                            native: true,
                        }}
                        label="Select Entrepreneur"
                        onChange={e => setNewEntrepreneur(e.target.value)}
                    >
                        <option value={null}>-- None --</option>
                        {entrepreneur &&
                            entrepreneur.map(ent => (
                                <option key={ent.id} value={ent.id}>
                                    {ent.title}
                                </option>
                            ))}
                    </TextField>


                    {/* Add some sort of divider???*/}

                    {/* Support 1 edit dropdown */}
                    <TextField
                        sx={{ m: 1, width: '20ch' }}
                        select
                        defaultValue={hit.support ? hit.support[0].support_id : null}
                        SelectProps={{
                            native: true,
                        }}
                        label='Select Support Tag'
                        onChange={e => {
                            setNewSupport1(e.target.value);
                            hit.support
                                ? setUpdatedSupportJoin1(hit.support[0].support_join_id)
                                : null;
                            console.log(hit.support[0].support_join_id);
                        }}
                    >
                        <option value={null}>-- Add Support Tag --</option>
                        {support &&
                            support.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.title}
                                </option>
                            ))}
                    </TextField>
                    {/* Funding 1 dropdown */}
                    <TextField
                        sx={{ m: 1, width: '20ch' }}
                        select
                        defaultValue={hit.funding ? hit.funding[0].funding_id : null}
                        SelectProps={{
                            native: true,
                        }}
                        label='Select Funding 1 Tag'
                        onChange={e => {
                            setNewFunding1(e.target.value);
                            hit.funding
                                ? setUpdatedFundingJoin1(hit.funding[0].funding_join_id)
                                : null
                        }}
                    >
                        <option value={null}>-- Add Funding Tag --</option>
                        {funding &&
                            funding.map(fund => (
                                <option key={fund.id} value={fund.id}>
                                    {fund.title}
                                </option>
                            ))}
                    </TextField>
                    <br />
                    {/* Support 2 dropdown */}
                    <TextField
                        sx={{ m: 1, width: '20ch' }}
                        select
                        defaultValue={hit.support ? hit.support[1] ? hit.support[1].support_id : null : null}
                        SelectProps={{
                            native: true,
                        }}
                        label='Select Support 2 Tag'
                        onChange={e => {
                            setNewSupport2(e.target.value);
                            hit.support && hit.support[1]
                                ? setUpdatedSupportJoin2(hit.support[1].support_join_id)
                                : null;
                            console.log(hit.support[1].support_join_id);
                        }}
                    >
                        <option value={null}>-- Add Support Tag --</option>
                        {support &&
                            support.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.title}
                                </option>
                            ))}
                    </TextField>
                    {/* Funding 2 dropdown */}
                    <TextField
                        sx={{ m: 1, width: '20ch' }}
                        select
                        defaultValue={hit.funding ? hit.funding[1] ? hit.funding[1].funding_id : null : null}
                        SelectProps={{
                            native: true,
                        }}
                        label='Select Funding 2 Tag'
                        onChange={e => {
                            setNewFunding2(e.target.value);
                            hit.funding && hit.funding[1]
                                ? setUpdatedFundingJoin2(hit.funding[1].funding_join_id)
                                : null
                        }}
                    >
                        <option value={null}>-- Add Funding Tag --</option>
                        {funding &&
                            funding.map(fund => (
                                <option key={fund.id} value={fund.id}>
                                    {fund.title}
                                </option>
                            ))}
                    </TextField>
                    <br />
                    {/* Support 3 dropdown */}
                    <TextField
                        sx={{ m: 1, width: '20ch' }}
                        select
                        defaultValue={hit.support ? hit.support[2] ? hit.support[2].support_id : null : null}
                        SelectProps={{
                            native: true,
                        }}
                        label='Select Support 3 Tag'
                        onChange={e => {
                            setNewSupport3(e.target.value);
                            hit.support && hit.support[2]
                                ? setUpdatedSupportJoin3(hit.support[2].support_join_id)
                                : null;
                            console.log(hit.support[2].support_join_id);
                        }}
                    >
                        <option value={null}>-- Add Support Tag --</option>
                        {support &&
                            support.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.title}
                                </option>
                            ))}
                    </TextField>
                    {/* Funding 3 dropdown */}
                    <TextField
                        sx={{ m: 1, width: '20ch' }}
                        select
                        defaultValue={hit.funding ? hit.funding[2] ? hit.funding[2].funding_id : null : null}
                        SelectProps={{
                            native: true,
                        }}
                        label='Select Funding 3 Tag'
                        onChange={e => {
                            setNewFunding3(e.target.value);
                            hit.funding && hit.funding[2]
                                ? setUpdatedFundingJoin3(hit.funding[2].funding_join_id)
                                : null
                        }}
                    >
                        <option value={null}>-- Add Funding Tag --</option>
                        {funding &&
                            funding.map(fund => (
                                <option key={fund.id} value={fund.id}>
                                    {fund.title}
                                </option>
                            ))}
                    </TextField>
                </DialogContent>
            </Dialog>
            // if NOT in edit mode, show as normal
            :
            <Dialog open={open} onClose={handleClose}  >
                <DialogActions>
                    {/* render Edit and Delete buttons if the user is logged in as admin */}
                    {user && user.admin
                        ? <>
                            <IconButton onClick={() => setEditMode(true)} >
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={deleteResource} >
                                <DeleteIcon />
                            </IconButton>
                        </>
                        // checks if current to-do list contains this resource
                        : todoResources.some(e => e.id === hit.id || e.resource_id === hit.id)
                            // if on the current list, renders a checkmark
                            ? <IconButton>
                                <CheckIcon color="primary" />
                            </IconButton>
                            : user.id
                                // else if not on todo list, onClick for Add Button changes depending on user's logged-in status
                                ? <IconButton onClick={() => userPostTodo()} >
                                    <AddIcon />
                                </IconButton>
                                : <IconButton onClick={() => anonPostTodo()}>
                                    <AddIcon />
                                </IconButton>

                    }
                    {/* Closes modal */}
                    <IconButton onClick={handleClose} >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                {/* Title and content display */}
                <DialogTitle>{hit.name}</DialogTitle>
                {hit.image_url &&
                    <div style={{ padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', overflow: 'hidden' }}>
                        <img style={{ display: 'block', maxWidth: '100%', maxHeight: '250px' }} src={hit.image_url} alt={hit.name} />
                    </div>
                }
                <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                    <Typography variant="body1">{hit.description}</Typography>
                    <Link target="_blank" rel="noopener noreferrer" href={hit.website}>{hit.website && hit.website}</Link>
                    <Link href={`mailto:${hit.email}`}>{hit.email && hit.email}</Link>
                    <Link target="_blank" rel="noopener noreferrer" href={hit.linkedin}>{hit.linkedin && hit.linkedin}</Link>

                    <Typography variant="body1">{hit.address && hit.address}</Typography>


                    <DialogContentText>
                        <Chip color="primary" sx={{ mt: 2, mr: 1 }} label={hit.organization_name} />
                        <Chip color="secondary" sx={{ mt: 2, mr: 1 }} label={hit.stage_name} />
                        {hit.entrepreneur_title && <Chip color="primary" variant="outlined" sx={{ mt: 2, mr: 1 }} label={hit.entrepreneur_title} />}
                        {hit.funding && (
                            <Chip
                                color="secondary"
                                variant="outlined"
                                sx={{ mt: 2, mr: 1 }}
                                label={hit.funding.map((funding) => funding.title).join(', ')}
                            />
                        )}
                        {hit.support && (
                            <Chip
                                color="primary"
                                variant="outlined"
                                sx={{ mt: 2, mr: 1 }}
                                label={hit.support.map((support) => support.title).join(', ')}
                            />
                        )}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
    )
}