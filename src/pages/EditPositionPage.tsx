
import { useParams } from 'react-router-dom';

export const EditPositionPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log("ID: ", id)
  return <h1>Edit Position</h1>
  
}

