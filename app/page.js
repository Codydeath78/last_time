'use client'
import {Box, Stack, Typography,Button, Modal, Paper,TextField, setError, Alert, SearchBar} from '@mui/material'
import { getFirestore, collection, query, getDocs, Firestore, docSnap,doc, setDoc, deleteDoc, getDoc,count } from 'firebase/firestore';
import { useEffect,useState,SERVER_PROPS_EXPORT_ERROR } from 'react'
import { initializeApp, firebase } from 'firebase/app'
import { firestore } from './firebase';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};

const style = {
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
width: 400,
bgcolor: 'white',
border: '2px solid #000',
boxShadow: 24,
p: 4,
display: 'flex',
flexDirection: 'column',

gap:3,
}


export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleOpenSearch = () => setOpen(true)
  const handleCloseSearch = () => setOpen(false)
  const [itemName, setItemName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPantry, setFilteredPantry] = useState([])
  const [searched, setSearched] = useState('')

  const updatePantry = async () => {
    const snapshot = query(collection(firestore,'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({name:doc.id, ...doc.data()})
    })
    console.log(pantryList)
    setPantry(pantryList)
    setFilteredPantry(pantryList)
  }



  useEffect(()=> {
    updatePantry()
  },[])


const addItem = async (item) => {
const docRef = doc(collection(firestore,'pantry'), item)
//check if it exists
const docSnap = await getDoc(docRef)
if (docSnap.exists()) 
  {
    const {count} = docSnap.data()
    await setDoc(docRef, {count: count+1})
  }
else{
  await setDoc(docRef,{count:1})
}
await updatePantry()
}


const removeItem = async (item) => {
const docRef = doc(collection(firestore,'pantry'), item)
const docSnap = await getDoc(docRef)
if(docSnap.exists()){
  const {count} = docSnap.data()
  if(count===1){
    await deleteDoc(docRef)
  }
  else{
    await setDoc(docRef, {count: count-1})
  }


}
await updatePantry()
}



const requestSearch = (searchVal) => {
  // function=> to filter the pantry items based on the search query.
  setSearched(searchVal)
  const filtered = pantry.filter((item) =>
  item.name.toLowerCase().includes(searchVal.toLowerCase()))
    setFilteredPantry(filtered)
}

const cancelSearch = () => {
  //function=> to reset the search and show all pantry items.
  setSearched('')
  setFilteredPantry(pantry)
}


  return (
    <Box
    width= "100vw"
    height="100vh"
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    alignItems = {'center'}
    gap={2}
    >
  <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  >
  <Box sx = {style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Add Item
    </Typography>
    <Stack  width="100%" direction ={'row'} spacing= {2}>
          <TextField id="outlined-basic" 
          label="Item"
          variant="outlined"
          fullWidth
          value = {itemName}
          onChange={(e)=> setItemName(e.target.value)}
          />
          <Button variant="outlined"
          onClick={()=>{
            addItem(itemName)
            setItemName('')
            handleClose()
          }}
          >Add</Button>
        </Stack>
  </Box>
</Modal>
        
 

      <Button variant="contained" onClick={handleOpen}>Add</Button>
      
      <Paper>
    <SearchBar
      value={searched}
      onChange={(searchVal) => requestSearch(searchVal)}
      onCancelSearch={() => cancelSearch()}
    />
    {/* Your Material-UI Table */}
  </Paper>



      <Box border={'1px solid #333'} bgcolor={'#ADD8E6'}>
      <Box width="800px" height = "100px" bgcolor={'#ADD8E6'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Typography variant={'h2'} color= {'#333'} textAlign={'center'}>
        Pantry Item List:
        </Typography>
        
      </Box>
     <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
     {filteredPantry.map(({name, count})=>( //original was pantry.map

      
      <Box
      key={name}
      width="100%"
      minHeight="150px"
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      bgcolor={'#f0f0f0'}
      paddingX={5}
    >
    <Typography
    variant = {'h3'}
    color={'#333'}
    textAlign={'center'}
    >
    {
    //capitalize the first letter of the item//
    name.charAt(0)+ name.slice(1)
    }
    </Typography>
    
    <Typography
    variant ={'h3'}
    color = {'#333'}
    textAlign={'center'}
    >Quantity: {count}</Typography>



    <Button variant ="contained" onClick={() => removeItem(name)}>
      Remove
    </Button>
    </Box>
  ))}
     </Stack> 
     </Box>
    </Box>
  )
}