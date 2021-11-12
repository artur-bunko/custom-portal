import 'bootstrap/dist/css/bootstrap.css'
import SignUp from "../components/SignUp";
import axios from "axios";
import {InferGetStaticPropsType} from "next";
import {EdxRegistrationProviderImp} from "./api/structures/edx/edx-registration.provider";

type CountryOption = {
  value: string,
  name: string,
  default: boolean
}

export async function getStaticProps() {
  try {
    const cookies = await EdxRegistrationProviderImp.getCookiesToken()

    const response = await axios.get('https://learning.storeworkflows.com/api/user/v2/account/registration/', {
      headers: {
        'x-csrftoken': cookies.csrftoken,
        Referer: 'https://learning.storeworkflows.com/login?next=%2F',
      }
    });
    const form = response.data;
    const countryOptions: CountryOption[] = form.fields.filter(({name}: { name: string }) => name === "country")?.options ?? [];

    return {
      props: {
        countryOptions: countryOptions
      }
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        countryOptions: []
      }
    }
  }
}

function Home ({countryOptions = []}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (<SignUp countryOptions={countryOptions}/>)
}

export default Home;
