import Head from "next/head";
import {
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  FormControl,
  FormLabel,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useFetchProducts } from "@/features/product/useFetchProducts";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export default function Home() {
  const {
    data,
    isLoading: productsIsLoading,
    refetch: refetchProducts,
  } = useFetchProducts();
  const toast = useToast();
  console.log("test data user:", users);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
    },
    onSubmit: async () => {
      // melakukan post data yang sudah diisi melalui formInput
      const { name, email, phone, website } = formik.values;
      //Melakukan POST product
      mutate({
        name,
        email,
        phone,
        website,
      });
      formik.setFieldValue("name", "");
      formik.setFieldValue("email", "");
      formik.setFieldValue("phone", "");
      formik.setFieldValue("website", "");

      toast({
        title: "data ditambahkan",
        status: "success",
      });
    },
  });

  const { mutate, isLoading: createProductsIsLoading } = useMutation({
    mutationFn: async (body) => {
      const productsResponse = await axiosInstance.post("/users", body);

      return productsResponse;
    },
    onSuccess: () => {
      refetchProducts();
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const renderProducts = () => {
    return data?.data.map((product) => {
      return (
        <Tr key={product.id}>
          <Td>{product.id}</Td>
          <Td>{product.name}</Td>
          <Td>{product.email}</Td>
          <Td>{product.phone}</Td>
          <Td>{product.website}</Td>
        </Tr>
      );
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Heading>Product Page</Heading>
          <Table mb="3">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Description</Th>
                <Th>Image</Th>
              </Tr>
            </Thead>
            <Tbody>
              {renderProducts()}
              {productsIsLoading && <Spinner />}
            </Tbody>
          </Table>
          <form>
            <VStack spacing="4">
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <input
                  onChange={handleFormInput}
                  name="name"
                  value={formik.values.name}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                {/* pemanggilan input onchange seharusnya */}
                {/* <input onChange={(event) => handleFormInput(event)} name="email"/> */}
                <input
                  onChange={handleFormInput}
                  name="email"
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <input
                  onChange={handleFormInput}
                  name="phone"
                  value={formik.values.phone}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <input
                  onChange={handleFormInput}
                  name="website"
                  value={formik.values.website}
                />
              </FormControl>
              {createProductsIsLoading ? (
                  <Spinner />) : (
                    <Button>Submit Produtc</Button>
                  )
              }
              
            </VStack>
          </form>
        </Container>
      </main>
    </>
  );
}
