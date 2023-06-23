import { Box, Container, Divider, Stack, Typography } from '@mui/material';

const Footer = () => {

  const date = new Date();
  const getYear = date.getFullYear();

  return (
    <>
      <Box
        sx={{
          p: 0,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180">
          <path
            fill="#344457b5"
            fillOpacity="1"
            d="M0,96L60,106.7C120,117,240,139,360,154.7C480,171,600,181,720,165.3C840,149,960,107,1080,90.7C1200,75,1320,85,1380,90.7L1440,96L1440,180L1380,180C1180,180,1200,180,1080,180C960,180,840,180,720,180C600,180,480,180,360,180C240,180,120,180,60,180L0,180Z"
          ></path>
        </svg>
      </Box>
      <Box sx={{ bgcolor: '#344457b5', py: 4 }}>
        <Container>
          <Stack
            direction={{ md: 'row' }}
            justifyContent="space-evenly"
            sx={{ mb: 6 }}
          >
            <Stack>
              <Typography
                sx={{
                  px: 1,
                  border: 1,
                  textTransform: 'uppercase',
                }}
                color="white"
                variant="h5"
              >
                Crishika
              </Typography>
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                support@crishika.com
              </Typography>
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                Phone +91 8349006546
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                Locate Us
              </Typography>
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                NH 130, nawagaon
              </Typography>
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                Deobhog, gariyaband CG
              </Typography>
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                493890 IN
              </Typography>
            </Stack>
            <Stack>
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                Privacy policy
              </Typography>
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                Terms & conditions
              </Typography>
              <Typography sx={{ py: 1 }} color="white" variant="caption">
                Collaboration
              </Typography>
            </Stack>
          </Stack>
          <Divider />

          <Typography
            variant="caption"
            color="white"
            sx={{ display: 'block', textAlign: 'center' }}
          >
            Copyright  &#169; {getYear} All Rights Reserved by Crishika &#8482;
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
