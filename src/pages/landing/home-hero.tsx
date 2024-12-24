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
                    <Grid xs={12} md={6.5} >
                        <Typography variant='h4' color='error' gutterBottom>
                            النسخة الالكترونية لاختبار الفحص المختصر للحالة العقلية (MMSE):
                        </Typography>
                        <Typography variant='subtitle1' sx={{ ":first-letter": { color: 'error.main', fontWeight: 'bold' }, lineHeight: '35px' }}>
                            صممت النسخة الأصلية من طرف فولسن سنة 1975 لتقييم القدرات المعرفية للفرد وتحديد درجة اضطرابها ، يتكون الاختبار من 11 بعد وهي (التوجه الزماني، التوجه المكاني ، التخزين، الانتباه والحساب، التذكر، التسمية ، الإعادة ، فهم اللغة الشفهية ، فهم اللغة المكتوبة ، اللغة المكتوبة ، النسخ) موزعة على 30 سؤال ، تم تكييفه على البيئة الجزائرية و حساب الخصائص السيكومترية من طرف الباحثة فريدة تاقولميمت  سنة 2009.
                        </Typography>
                        <Typography variant='subtitle1' lineHeight='35px'>
                            ويعتبر من أكثر الاختبارات استخداما في المجال الإكلينيكي ، إذ يتمتع بحساسية عالية في تحديد الخرف وقياس ما يطرأ على الفرد من تغيرات معرفية مع مرور الوقت.                        </Typography>
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
                        <Grid xs={12} md={4.5} textAlign='center' m={'auto'}>
                            <img src={'/assets/quiz-vector.svg'} alt='header' width='80%' />
                        </Grid>
                    }
                </Grid>
            </Container>
        </Box>
    )
}
