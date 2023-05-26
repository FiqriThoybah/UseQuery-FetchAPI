import {
    Box,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Stack,
} from "@chakra-ui/react";
import {useFormik} from 'formik'
import * as yup from "yup";

function LoginForm() {
    const registUser = () =>{
        // alert("Submit Form!!");
        alert(formik.values.password);
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            email:"",
            password:""
        },
        onSubmit: registUser,
        validationSchema: yup.object().shape({
            username: yup.string().required().min(3).max(10),
            email: yup.string().required().email(),
            password: yup.string().required().matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "kata sandi harus ada huruf besar, huruf kecil, angka, dan symbol"
            )

        })
    });

    const handleForm = () => {
        const { target } = event
        formik.setFieldValue(target.name, target.value)
    }

    return (
        <Container py="10">
        <Heading>Example Form</Heading>
        <Box padding="4" border="1px solid lightgray" borderRadius="4px" mt="8">
            <form onSubmit={formik.handleSubmit}>
            <Stack spacing="3">
                <FormControl isInvalid={formik.errors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" onChange={handleForm} name="username"/>
                    <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" onChange={handleForm} name="email"/>
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" onChange={handleForm} name="password"/>
                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="teal">
                Register Account
                </Button>
            </Stack>
            </form>
        </Box>
        </Container>
    );
    }

export default LoginForm;
