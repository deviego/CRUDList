import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
}from '@chakra-ui/react'

import { useState } from 'react'


export function AddModal({data, setData, dataEdit, isOpen, onClose}){
    const [name, setName] = useState(dataEdit.name || "")
    const [email,setEmail] = useState(dataEdit.email || "")

    const handleSave = () => {
        if(!name || !email) return;

        if(emailAlreayExists()){
            return alert("Email já cadastrado!)")
        }
        if(Object.keys(dataEdit).length) {
            data[dataEdit.index] = {name, email }
        }

        const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), {name,email}]
        : [...(data ? data : [])];

        localStorage.setItem("cad_person", JSON.stringify(newDataArray))

        setData(newDataArray)
        onClose();

    };

    const emailAlreayExists = () => {
        if(dataEdit.email !== email && data?.length){
            return data.find((item) => item.email === email)
        }

        return false
    }
    return(
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> Cadastro de Pessoas</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl display="flex" flexDir="column" gap={4}>
                        <Box>
                            <FormLabel>Digite seu Nome</FormLabel>
                            <Input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </Box>
                        <Box>
                            <FormLabel>Digite seu melhor EMAIL</FormLabel>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Box>
                    </FormControl>
                </ModalBody>

                <ModalFooter justifyContent="start">
                    <Button color="green" mr={3} onClick={handleSave}> Salvar </Button>
                    <Button color="red"  onClick={onClose}> Cancelar </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}