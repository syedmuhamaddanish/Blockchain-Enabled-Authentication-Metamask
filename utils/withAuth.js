import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const [resp, setResponse] = useState('Valid');

    useEffect(() => {
      const checkMetamask = async () => {
        console.log("hello")
        if (typeof window.ethereum !== 'undefined') {
          try {
           
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const currentAddress = await signer.getAddress();
            const token = localStorage.getItem(currentAddress);
            console.log(token)
            if (token != '') {
                const response = await fetch('/api/verify', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                });
                let newresponse = await response.json();
                setResponse(newresponse.message);
                console.log(newresponse);
                if (resp !== 'Valid') {
                    window.localStorage.removeItem(currentAddress);
                    router.push('/');
                }
            }
            
            else {
                router.push('/');
            }
          } catch (err) {
            console.error(err);
          }
        }
      };

      checkMetamask();
    }, [resp, router]);

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
