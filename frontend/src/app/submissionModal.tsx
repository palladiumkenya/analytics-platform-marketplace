'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GenericAlert from './genericAlert';
import { AlertColor } from '@mui/material/Alert';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const buttonStyle = {
    left: '90%'
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
// export default function BasicModal({stateChanger}) {
    export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const [alertData, setAlertData] = React.useState<{ showAlert: boolean; alertMessage: string; alertSeverity: AlertColor }>({
        showAlert: false,
        alertMessage: '',
        alertSeverity: 'success'
    });
    const [formData, setFormData] = React.useState<{ pluginName: string; description: string; file: File | null }>({
        pluginName: '',
        description: '',
        file: null,
    });
    const [pluginNameValidation, setPluginNameValidation] = React.useState<{isInvalid: boolean; errorMessage: string}>({
        isInvalid: false,
        errorMessage: '',
    });

    const [pluginDescriptionValidation, setPluginDescriptionValidation] = React.useState<{isInvalid: boolean; errorMessage: string}>({
        isInvalid: false,
        errorMessage: '',
    });

    const [pluginFileValidation, setPluginFileValidation] = React.useState<{isInvalid: boolean; errorMessage: string}>({
        isInvalid: false,
        errorMessage: '',
    })

    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);
    const clearForm = () => setFormData({pluginName: '', description: '', file: null});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData((prevData) => ({
            ...prevData,
            file: file,
        }));
    };

    React.useEffect(() => {

        if (alertData.showAlert) {
            setTimeout(() => {
                setAlertData({showAlert: false, alertMessage: '', alertSeverity: 'success'});
            }, 3000);
        }
      }, [alertData]);

    const validatePluginName = () => {
        if (!formData.pluginName) {
            setPluginNameValidation({isInvalid: true, errorMessage: 'Plugin Name is Required'});
            return false;
        } else {
            setPluginNameValidation({isInvalid: false, errorMessage: ''});
            return true;
        }
    }

    const validatePluginDescription = () => {
        if (formData.description) {
            setPluginDescriptionValidation({isInvalid: false, errorMessage: ''});
            return true;
        } else {
            setPluginDescriptionValidation({isInvalid: true, errorMessage: 'Plugin Description is Required'});
            return false;
        }
    }

    const validatePluginFile = () => {
        if (formData.file) {
            setPluginFileValidation({isInvalid: false, errorMessage: ''});
            
            return true;
        } else {
            setPluginFileValidation({isInvalid: true, errorMessage: 'Plugin File is Required'});
            setAlertData({showAlert: true, alertMessage: pluginFileValidation.errorMessage, alertSeverity: 'error'})
            return false;
        }
    }

    const handleSubmit = async () => {
        
        if (validatePluginName() && validatePluginDescription() && validatePluginFile()) {
            // submit form
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('pluginName', formData.pluginName);
            formDataToSubmit.append('description', formData.description);
            if (formData.file) {
                formDataToSubmit.append('default', formData.file);
            }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_MARKETPLACE_API}/configs/upload`, {
                    method: 'POST',
                    body: formDataToSubmit,
                });
                if (response.ok) {
                    clearForm();
                    // stateChanger();
                    handleModalClose();
                    setAlertData({ showAlert: true, alertMessage: 'Successfully submitted plugin', alertSeverity: 'success' })
                }
            } catch (error) {
                console.error('Error submitting form: ', error);
                setAlertData({ showAlert: true, alertMessage: 'Error submitting form', alertSeverity: 'error' })
            }
        }        
    }


    return (
        <div>
            <Button sx={buttonStyle} onClick={handleModalOpen}>Submit Plugin</Button>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        component="form"
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600 }}
                        >
                 
                                <TextField
                                    required
                                    id="pluginName"
                                    name="pluginName"
                                    label="Name"
                                    onChange={handleInputChange}
                                    error={pluginNameValidation.isInvalid}
                                    helperText= {pluginNameValidation.errorMessage && pluginNameValidation.errorMessage}
                                    value={formData.pluginName}
                                />
                                <TextField
                                    required
                                    id="description"
                                    name="description"
                                    label="Description"
                                    onChange={handleInputChange}
                                    error={pluginDescriptionValidation.isInvalid}
                                    helperText= {pluginDescriptionValidation.errorMessage && pluginDescriptionValidation.errorMessage}
                                    value={formData.description}
                                    multiline
                                    rows={4}
                                />

                            <Stack direction="row" spacing={2}>
                                <Button
                                    component="label"
                                    // role={undefined}
                                    variant="outlined"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Plugin
                                    <VisuallyHiddenInput
                                     type="file"
                                     onChange={handleFileChange}
                                      />
                                </Button>
                            </Stack>

                            <Button
                                component="label"
                                variant="contained"
                                tabIndex={-1}
                                sx={{ marginTop: '28px' }}
                            onClick={handleSubmit}
                            >
                                Submit
                            </Button>

                    </Box>

                </Box>
            </Modal>
           {alertData.showAlert && <GenericAlert message={alertData.alertMessage} alertSeverity={alertData.alertSeverity} />} 
        </div>
    );
}
