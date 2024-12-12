
import { View, Text } from 'react-native'
import React from 'react'
import { supabase } from '@/app/lib/supabase'

type PetData = {
    userid:string | null,
    pname: string;
    pbreed: string | null;
    psex: string;
    ptype: string | null;
    page:string | null;
    pnote:string | null;

  };

const addpet = async (petData:PetData) => {
    console.log(petData);
  
const { data, error } = await supabase
.from('pet')
.insert([
  { name:petData.pname, breed:petData.pbreed, sex:petData.psex, species:petData.ptype, age:petData.page, pnote:petData.pnote, userid:petData.userid },
])
.select()
        
}

export default addpet
          