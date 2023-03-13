import {
	View,
	Text,
	SafeAreaView,
	Image,
	TextInput,
	ScrollView,
} from "react-native";
import { React, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	UserIcon,
	ChevronDownIcon,
	MagnifyingGlassIcon,
	AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity.js";

const HomeScreen = () => {
	const navigation = useNavigation();
	const [featuredCategories, setFeaturedCategories] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		client
			.fetch(
				`
				*[_type == "featured"] {
					...,
				restaurants[]->{
					...,
					dishes[]->
			}
			}
			`
			)
			.then((data) => {
				setFeaturedCategories(data);
			});
	}, []);

	return (
		<SafeAreaView className="pt-5 bg-white">
			{/* Header */}
			<View className="flex-row items-center pb-3 mx-4 space-x-2">
				<Image
					source={{
						uri: "https://links.papareact.com/wru",
					}}
					className="p-4 bg-gray-300 rounded-full h-7 w-7"
				/>

				<View className="flex-1">
					<Text className="text-xs font-bold text-gray-400">Deliver Now!</Text>
					<Text className="text-xl font-bold">
						Current Location
						<ChevronDownIcon size={20} color="#00CCBB" />
					</Text>
				</View>
				<UserIcon size={35} color="#00CCBB" />
			</View>

			{/* Search */}
			<View className="flex-row items-center pb-2 mx-4 space-x-2">
				<View className="flex-row flex-1 p-3 space-x-2 bg-gray-200">
					<MagnifyingGlassIcon color="gray" size={20} />
					<TextInput
						placeholder="Restaurants and cuisines"
						keyboardType="default"
					/>
				</View>
				<AdjustmentsVerticalIcon color="#00CCBB" />
			</View>

			{/* Body */}
			<ScrollView
				className="bg-gray-100"
				contentContainerStyle={{
					paddingBottom: 100,
				}}
			>
				{/* Categories */}
				<Categories />

				{/* Featured */}
				<FeaturedRow
					id="123"
					title="Featured"
					description="Paid placements from our partners"
				/>

				{/* Tasty Discounts */}
				<FeaturedRow
					id="1234"
					title="Tasty Discounts"
					description="Everyone's been enjoying these juicy discounts!"
				/>

				{/* Offers near you */}
				<FeaturedRow
					id="12345"
					title="Offers near you!"
					description="Why not support your local restaurant tonight!"
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
