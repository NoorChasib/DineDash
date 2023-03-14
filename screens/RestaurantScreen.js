import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import {
	ArrowLeftIcon,
	StarIcon,
	ChevronRightIcon,
	MapPinIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";

const RestaurantScreen = () => {
	const navigation = useNavigation();

	const {
		params: {
			id,
			imgUrl,
			title,
			rating,
			genre,
			address,
			short_description,
			dishes,
			long,
			lat,
		},
	} = useRoute();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<>
			<BasketIcon />

			<ScrollView>
				<View className="relative">
					<Image
						source={{
							uri: urlFor(imgUrl).url(),
						}}
						className="w-full h-56 p-4 bg-gray-300"
					/>
					<TouchableOpacity
						onPress={navigation.goBack}
						className="absolute p-2 bg-gray-100 rounded-full left-5 top-14"
					>
						<ArrowLeftIcon size={20} color="#00CCBB" />
					</TouchableOpacity>
				</View>

				<View className="bg-white">
					<View className="px-4 pt-4">
						<Text className="text-3xl font-bold">{title}</Text>
						<View className="flex-row my-1 space-x-2">
							<View className="flex-row items-center space-x-1">
								<StarIcon color="green" opacity={0.5} size={22} />
								<Text className="text-xs text-gray-500">
									<Text className="text-green-500">{rating}</Text> • {genre}
								</Text>
							</View>

							<View className="flex-row items-center space-x-1">
								<MapPinIcon color="gray" opacity={0.4} size={22} />
								<Text className="text-xs text-gray-500">
									Nearby • {address}
								</Text>
							</View>
						</View>

						<Text className="pb-4 mt-2 text-gray-500">{short_description}</Text>
					</View>

					<TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
						<QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
						<Text className="flex-1 pl-2 font-bold text-md">
							Have a food allergy?
						</Text>
						<ChevronRightIcon color="#00CCBB" />
					</TouchableOpacity>
				</View>

				<View className="pb-36">
					<Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

					{/* Dishrows */}
					{dishes.map((dish) => (
						<DishRow
							key={dish._id}
							id={dish._id}
							name={dish.name}
							description={dish.short_description}
							price={dish.price}
							image={dish.image}
						/>
					))}
				</View>
			</ScrollView>
		</>
	);
};

export default RestaurantScreen;
