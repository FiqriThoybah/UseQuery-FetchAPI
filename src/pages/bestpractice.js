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
  Input,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  useCreateProduct,
  useDeleteProduct,
  useEditProduct,
  useFetchProducts,
} from "@/features/product";

export default function Home() {
  const toast = useToast();

  const {
    data,
    isLoading: productsIsLoading,
    refetch: refetchProducts,
  } = useFetchProducts({
    onError: () => {
      toast({
        title: "shometing error!!",
        status: "error",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      id: 0,
    },
    onSubmit: async () => {
      // melakukan post data yang sudah diisi melalui formInput
      const { name, email, phone, website, id } = formik.values;
      if (id) {
        // melakukan PATCH product/{id}
        editProduct({
          name,
          email,
          phone,
          website,
          id,
        });

        toast({
          title: "Product edited",
          status: "success",
        });
      } else {
        //Melakukan POST product
        createProduct({
          name,
          email,
          phone,
          website,
        });

        toast({
          title: "data ditambahkan",
          status: "success",
        });
      }
      formik.setFieldValue("name", "");
      formik.setFieldValue("email", "");
      formik.setFieldValue("phone", "");
      formik.setFieldValue("website", "");
      formik.setFieldValue("id", 0);
    },
  });

  const { mutate: createProduct, isLoading: createProductsIsLoading } =
    useCreateProduct({
      onSuccess: () => {
        refetchProducts();
      },
    });

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      refetchProducts();
    },
  });

  const { mutate: editProduct, isLoading: editProductIsLoading } =
    useEditProduct({
      onSuccess: () => {
        refetchProducts();
      },
    });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const confirmationDelete = (productId) => {
    const shouldDelete = confirm("Apakah Kamu ingin menghapus?");

    if (shouldDelete) {
      deleteProduct(productId);
      toast({
        title: "Delete Product",
        status: "info",
      });
    }
  };

  const onEditClick = (product) => {
    formik.setFieldValue("id", product.id);
    formik.setFieldValue("name", product.name);
    formik.setFieldValue("email", product.email);
    formik.setFieldValue("phone", product.phone);
    formik.setFieldValue("website", product.website);
  };

  const renderProducts = () => {
    return data?.data.map((product) => {
      console.log("test :", product);
      return (
        <Tr key={product.id}>
          <Td>{product.id}</Td>
          <Td>{product.name}</Td>
          <Td>{product.email}</Td>
          <Td>{product.phone}</Td>
          <Td>{product.website}</Td>
          <Td>
            <Button onClick={() => onEditClick(product)} colorScheme="cyan">
              Edit {product.id}
            </Button>
          </Td>
          <Td>
            <Button
              onClick={() => confirmationDelete(product.id)}
              colorScheme="red"
            >
              Delete {product.id}
            </Button>
          </Td>
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
              <Tr bgColor={'red'} >
                <Th colSpan={4} textAlign="center" color={'white'} >Heade 01</Th>
                <Th colSpan={3} textAlign='center' color={'white'}>Header 02</Th>
              </Tr>
              <Tr bgColor={'yellow'}>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th> 
                <Th>Phone</Th>
                <Th>Website</Th>
                <Th colSpan={2}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {renderProducts()}
              {productsIsLoading && <Spinner />}
            </Tbody>
          </Table>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing="3">
              <FormControl>
                <FormLabel>ID</FormLabel>
                <Input
                  onChange={handleFormInput}
                  name="id"
                  value={formik.values.id}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  onChange={handleFormInput}
                  name="name"
                  value={formik.values.name}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                {/* pemanggilan input onchange seharusnya */}
                {/* <input onChange={(event) => handleFormInput(event)} name="email"/> */}
                <Input
                  onChange={handleFormInput}
                  name="email"
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  onChange={handleFormInput}
                  name="phone"
                  value={formik.values.phone}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <Input
                  onChange={handleFormInput}
                  name="website"
                  value={formik.values.website}
                />
              </FormControl>
              {createProductsIsLoading || editProductIsLoading ? (
                <Spinner />
              ) : (
                <Button type="submit">Submit Data</Button>
              )}
            </VStack>
          </form>
        </Container>
      </main>
    </>
  );
}
