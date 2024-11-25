import { m } from 'framer-motion';
import { Container, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import { useResponsive } from 'src/hooks/use-responsive';
import about from 'src/assets/home/about.jpg'


export default function HomeAbout() {


    const mdUp = useResponsive('up', 'md');

    const renderDescription = (
        <Stack
            sx={{
                textAlign: { xs: 'center', md: 'unset' },
                pl: { md: 5 },
                pt: { md: 5 },
            }}
            spacing={1}
        >
            <Typography variant="h4" gutterBottom>
                طريقة تطبيق الاختبار:
            </Typography>
            <Typography variant="body1">
                يطبق هذا الاختبار بصفة فردية وفي قاعة هادئة.
            </Typography>

            <Typography variant="body1">
                تُعطى التعليمات مرة واحدة وبطريقة واضحة ودون إعادة أو تساهل. في حال كانت الإجابة غير كاملة وغير واضحة يُنصف الجواب بالنقطة صفر.
            </Typography>

            <Typography variant="h5" gutterBottom>
                المهام:
            </Typography>
            <Typography variant="body1">
                تهدف لتقييم القدرات المعرفية، وتحدد درجة اضطرابها.
            </Typography>

            <Typography variant="h5" gutterBottom>
                الوسيلة:
            </Typography>
            <Typography variant="body1">
                رؤية البيئة معلمة أو قائمة مساعدة (البند 8 و 10 و 11 تتطلب هذا النموذج ليعطي قياس الحالة).
            </Typography>

            <Typography variant="h5" gutterBottom>
                المفحوص:
            </Typography>
            <Typography variant="body1">
                إدراك وتحديد القراءة، الكتابة، الحساب.
            </Typography>

            <Typography variant="h5" gutterBottom>
                المعلومات الخاصة:
            </Typography>
            <Typography variant="body1">
                شارك بطرح بعض الأسئلة لمعرفة كاملة مثل ما ذاكرتك، بعضياً جد سبل معينة للرسالة وبضعياً أنا الرسالة وعلق أن تجيب قدر المستطاع.
            </Typography>
        </Stack>
    );

    return (
        <>
            <Container
                id='About_us'
                //   component={MotionViewport}
                sx={{
                    py: { xs: 8, md: 15 },
                }}
            >
                <Grid container columnSpacing={{ md: 10 }} sx={{ height: 1 }}>
                    {
                        mdUp && (
                            <Grid
                                xs={12}
                                md={5}
                                my={'auto'}
                                textAlign={'center'}
                            >
                                <img src="/assets/logo-quiz.png" alt="logo-quiz" width='70%' />
                            </Grid>
                        )
                    }
                    <Grid xs={12} md={7}>
                        {renderDescription}
                    </Grid>
                </Grid>

            </Container>
        </>
    )
}
