import { Box, Button, Container, Typography } from '@mui/material'
const Mui = () => {
    
  return (
    <>
      <Container className="container1" style={{backgroundColor:'white', height:'45px', width:'100%',border:'1px solid rgb(197, 195, 195)'}}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
                <div>
                    <Typography variant='body1' style={{color:'red', fontWeight:'bolder', fontSize:'14px', display:'inline'}}>
                        PO NO:
                    </Typography>
                    <Typography variant='h6' style={{color:'black', fontWeight:'bolder', fontSize:'14px', display:'inline'}}>
                        123
                    </Typography>
                </div>
                <div>
                    <Typography variant='body1' style={{color:'red', fontWeight:'bolder', fontSize:'14px', display:'inline'}}>
                        PO GST Excl Amount GST:
                    </Typography>
                    <Typography variant='h6' style={{color:'black', fontWeight:'bolder', fontSize:'14px', display:'inline'}}>
                        123
                    </Typography>
                </div>
                <div>
                    <Typography variant='h6' style={{color:'red', fontWeight:'bolder', fontSize:'14px', display:'inline'}}>
                        PO Total Amount:
                    </Typography>
                    <Typography variant='h6' style={{color:'black', fontWeight:'bolder', fontSize:'14px', display:'inline'}}>
                        123
                    </Typography>
                </div>
                
                    <Button variant='contained' style={{backgroundColor: '#d2f5c4', color: '#4caf50',borderRadius: '8px',fontSize:'10px'}}>
                        Download PO
                    </Button>
            </Box>
      </Container>
    </>
  )
}

export default Mui
