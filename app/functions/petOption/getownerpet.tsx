import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase'; // make sure you have configured supabase client

interface Vaccination {
  name: string;
  date: string;
  status: string;
}

interface Pet {
  id: string;
  name: string;
  status: string;
  breed: string;
  birthday: string;
  age: string;
  vaccinationDetails: string;
  notes: string;
  vaccinations: Vaccination[];
} 

const fetchPetsData = async (): Promise<Pet[]> => {
  try {
    const userInfoJSON = await AsyncStorage.getItem('user');
    if (userInfoJSON) {
      const userInfo = JSON.parse(userInfoJSON);
      const userId = userInfo.id; // assuming 'id' is the key for user ID

      let { data: petData, error: petError }:any = await supabase
        .from('pet')
        .select("*")
        .eq('userid', userId);

      if (petError) {
        console.error(petError);
        throw new Error('Error fetching pet data');
      }

      const petsWithVaccinations = await Promise.all(
        petData.map(async (pet: any) => {
          let { data: vaccineData, error: vaccineError }:any = await supabase
            .from('vaccine_data')
            .select("*")
            .eq('petid', pet.pid);

          if (vaccineError) {
            console.error(vaccineError);
            throw new Error('Error fetching vaccine data');
          }

          const formattedPet: Pet = {
            id: pet.pid,
            name: pet.name,
            status: pet.status,
            breed: pet.breed,
            birthday: pet.birthday,
            age: pet.age,
            vaccinationDetails: vaccineData.map((v: any) => v.name).join(', '),
            notes: pet.pnote,
            vaccinations: vaccineData.map((v: any) => ({
              name: v.name,
              date: v.date,
              status: v.status,
            })),
          };

          return formattedPet;
        })
      );

      return petsWithVaccinations;
    } else {
      throw new Error('User not found in AsyncStorage');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data');
  }
};

export default fetchPetsData;
