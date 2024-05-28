import Image from 'next/image'
import FindTicketsForm from '@/components/findTicketsForm.jsx'
import ConsentModalMinimal from '@/components/consentModalMinimal.jsx'




export default function Home() {
  return (
   <main>
    <FindTicketsForm/>
    <ConsentModalMinimal /> 
   </main>
  )
}
