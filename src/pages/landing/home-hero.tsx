import { Box, Button, Container, Typography } from '@mui/material'
import { useResponsive } from 'src/hooks/use-responsive'
import Grid from '@mui/material/Unstable_Grid2';
import { paths } from 'src/routes/paths';


export default function HomeHero() {
    const mdUp = useResponsive('up', 'md');
    return (
        <Box
            sx={{ display: 'flex', mt: { xs: 8, md: 10 } }}
        >
            <Container maxWidth='lg' sx={{ p: 5 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6} >
                        <Typography variant='h3' color='error' gutterBottom>
                            MMSE اختبار الفحص المختصر للحالة العقلية
                        </Typography>
                        <Typography variant='subtitle1' sx={{ ":first-letter": { color: 'error.main', fontWeight: 'bold' }, lineHeight: '35px' }}>
                            و هو اختبار مصمم من طرف "فولستين" سنة 1975 لتقييم القدرات المعرفية للفرد، وتحديد درجة اضطرابها منها الذاكرة، الانتباه، اللغة، وتحديد قدرة الفرد على الرسم، والتي جاءت في شكل 11 بعدد يجمع 30 سؤال.
                        </Typography>
                        <Typography variant='subtitle1' lineHeight='35px'>
                            ويعتبر هذا الاختبار من أكثر الاختبارات استخداماً في المجال الإكلينيكي لقياس الخرف إذ ترتفع حساسيتة عند ارتفاع درجة الخرف ويقيس بطريقة مطلقة على الأفراد من نفس الثقافة حيث تتغير الدرجة مع مرور الوقت (من غرب آسيا)، 2012، ص 85-84).
                        </Typography>
                        <Button
                            variant='contained'
                            color='error'
                            size='large'
                            sx={{ mt: { xs: 2, md: 4 }, letterSpacing: '1.5px' }}
                            href={paths.dashboard.index}
                        >
                            ابدأ الاختبار
                        </Button>

                    </Grid>
                    {
                        mdUp &&
                        <Grid xs={12} md={6} textAlign='center' my={'auto'}>
                            <img src={'/assets/quiz-vector.svg'} alt='header' width='70%' />
                        </Grid>
                    }
                </Grid>
            </Container>
        </Box>
    )
}
