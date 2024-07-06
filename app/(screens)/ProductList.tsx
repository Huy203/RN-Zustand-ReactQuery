import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts } from '../services/product.service';
import { useProductStore } from '../store/productStore';
import useSWR from 'swr';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';

export const ProductList = () => {

    // With SWR
    const { data, error, isLoading } = useSWR('products', fetchProducts);
    // With react-query
    // const { data, error, isLoading } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

    const setProducts = useProductStore((state) => state.setProducts);
    const products = useProductStore((state) => state.products);

    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data, setProducts]);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error fetching products</Text>;
    }

    console.log(products);

    return (
        <ScrollView>
            {products.map((product) => (
                <View key={product.id} style={styles.productContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                    />
                    <Text style={styles.productTitle}>{product.title}</Text>
                    <Text style={styles.productPrice}>${product.price}</Text>
                    <Text style={styles.productCategory}>{product.category}</Text>
                    <Text style={styles.productDescription}>{product.description}</Text>
                    <Text style={styles.productRating}>
                        {product.rating.rate} ({product.rating.count})
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    productContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: 'green',
    },
    productCategory: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    productDescription: {
        fontSize: 12,
    },
    productRating: {
        fontSize: 12,
        color: '#888',
    },
});