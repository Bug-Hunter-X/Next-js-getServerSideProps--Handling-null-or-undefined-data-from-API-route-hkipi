```javascript
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export default async function MyComponent({data}) {
  return (
    <div>
       <h1>{JSON.stringify(data)}</h1>
    </div>
  );
}

// This is what I would like to achieve
export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context, authOptions);
  const data = await fetch('/api/data').then(res => res.json());

  // Error occurs here, when data is null or undefined
  if(!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
      data // This is what I am passing to the component
    },
  };
}
```