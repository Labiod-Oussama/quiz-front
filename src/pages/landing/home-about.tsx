import { Container, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import { useResponsive } from 'src/hooks/use-responsive';


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
                الهدف من الاختبار:
            </Typography>
            <Typography variant="body1">
                تقييم القدرات المعرفية وتحديد  درجة اضطرابها.
            </Typography>
            <Typography variant="h4" gutterBottom>
                شروط تطبيق الاختبار:
            </Typography>
            <Typography variant="body1">
                - يطبق بصفة فردية وفي غرفة هادئة.
            </Typography>

            <Typography variant="body1">
                - تعطى التعليمة مرة واحدة بطريقة واضحة دون إعادة أو تساهل .
            </Typography>
            <Typography variant="body1">
                - في حال كانت الإجابة غير كاملة لا تعطي نصف العلامة بل تعطى النقطة صفر.
            </Typography>
            <Typography variant="body1">
                - المفحوص راشد يستطيع القراءة والكتابة والحساب.
            </Typography>

            <Typography variant="h5" gutterBottom>
                التعليمة:
            </Typography>
            <Typography variant="body1">
                سأطرح عليك بعض الأسئلة لمعرفة كيف تعمل ذاكرتك ، بعضها جد سهل وبعضها أقل سهولة وعليك أن تجيب قدر المستطاع.
            </Typography>

            <Typography variant="h5" gutterBottom>
                الوسائل المستخدمة:
            </Typography>
            <Typography variant="body1">
                ورقة بيضاء ، قلم ـ ممحاة (الأبعاد 8، 10 ، 11 فقط تتطلب هذا ، أما بقية الأبعاد يتم الإجابة عنها شفهيا من طرف الحالة).
            </Typography>

            <Typography variant="h5" color='warning.main'>
                ملاحظة:
            </Typography>
            <Typography variant="body1">
                لا يجب عرض الشاشة على الحالة إلا في حالة الأبعاد الأدائية.
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
