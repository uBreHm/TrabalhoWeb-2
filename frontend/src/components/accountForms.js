import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input, useToast, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { createAccounts, updateAccounts, fetchAccountsById } from '../pages/api/accounts';

const AccountForm = ({ accountId }) => {
    const [description, setDescription] = useState('');
    const [comments, setComments] = useState('');
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        if (accountId) {
            fetchAccount(accountId);
        }
    }, [accountId]);

    const fetchAccount = async (id) => {
        try {
            const response = await fetchAccountsById(id);
            const { description, comments } = response;
            setDescription(description);
            setComments(comments);
        } catch (error) {
            toast({
                title: 'Erro ao buscar conta.',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accountData = { description, comments };

        try {
            if (accountId) {
                await updateAccounts(accountId, accountData);
                toast({
                    title: 'Conta atualizada.',
                    description: 'Conta atualizada com sucesso!',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                await createAccounts(accountData);
                toast({
                    title: 'Conta criada.',
                    description: 'Conta criada com sucesso!',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            }
            router.push('/admin/accounts');
        } catch (error) {
            toast({
                title: 'Erro.',
                description: `${accountId ? 'Erro ao atualizar' : 'Erro ao criar'} conta: ${error.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Card boxShadow="base" borderRadius="md" p={4}>
            <CardHeader>Formulário de Conta</CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <FormControl id="description" isRequired>
                        <FormLabel>Descrição</FormLabel>
                        <Input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="comments" mt={4}>
                        <FormLabel>Comentários</FormLabel>
                        <Input
                            type="text"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </FormControl>
                    <Button mt={4} colorScheme="teal" type="submit">
                        {accountId ? 'Atualizar Conta' : 'Criar Conta'}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default AccountForm;