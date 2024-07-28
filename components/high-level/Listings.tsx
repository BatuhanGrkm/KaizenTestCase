import { URL } from "@/api";
import useFetch from "@/hooks/useFetch";
import { ListingType } from "@/types/listingType";
import React, { useEffect, useState, useCallback } from "react";
import { View, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import CustomImageCarousal from "../low-level/CustomCarousel";
import EmptyComponent from "../low-level/EmptyList";

interface Props {
  category: number;
}

const Listings = ({ category }: Props) => {
  const [dataWithCategories, setDataWithCategories] = useState<ListingType[]>([]); // Kategori bilgileriyle birlikte veriyi tutar
  const [filteredData, setFilteredData] = useState<ListingType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch } = useFetch<ListingType[]>(`${URL}/promotions/list?Channel=PWA`);
  const categoryIds = [85, 63, 64, 66, 67, 67, 69, 70, 71]; // Serviste kategori filtreme verisi gelmediği için rastgele kategori ID'leri atanır

  const refreshData = useCallback(async () => {
    setRefreshing(true); // Yenilemeyi başlatır
    await refetch(); // Veriyi yeniden çeker
    setRefreshing(false); // Yenilemeyi durdurur
  }, [refetch]);

  useEffect(() => {
    if (data) {
      const updatedData = data.map((item, index) => ({
        ...item,
        key: index.toString(), // Her veri için anahtar ekler
        CategoryId: categoryIds[Math.floor(Math.random() * categoryIds.length)], // Rastgele kategori ID'si ekler
      }));
      setDataWithCategories(updatedData); // Güncellenmiş veriyi state'e set eder
    }
  }, [data]);

  useEffect(() => {
    if (category === 0) {
      setFilteredData(dataWithCategories); // Tüm veriyi filtreler
    } else {
      setFilteredData(dataWithCategories.filter((item) => item.CategoryId === category)); // Kategoriye göre veriyi filtreler
    }
  }, [dataWithCategories, category]);

  const renderContent = () => {
    if (refreshing || !data) {
      return <ActivityIndicator size="large" color="#0000ff" />; // Veriler yükleniyorsa gösterilecek içerik
    }

    if (filteredData.length > 0) {
      return <CustomImageCarousal data={filteredData} autoPlay={false} pagination={true} />; // Filtrelenmiş veriyi carousal olarak gösterir
    }

    return <EmptyComponent />; // Veri yoksa gösterilecek içerik
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshData} />}>
      <View>{renderContent()}</View>
    </ScrollView>
  );
};

export default Listings;
