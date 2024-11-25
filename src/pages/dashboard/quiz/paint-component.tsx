import { Box, BoxProps, Button, useTheme } from '@mui/material'
import { Stack, styled } from '@mui/system'
import { useState, useRef } from 'react'
import Signature, { SignatureRef } from '@uiw/react-signature'

interface StyledSignatureBoxProps extends BoxProps {
    type?: 'paint' | 'text'
}

const StyledSignatureBox = styled(Box)<StyledSignatureBoxProps>(({ theme, type }) => ({
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    touchAction: 'none',
    width: type === 'text' ? '100%' : '300px',
    height: type === 'text' ? '200px' : '300px',
}))


export default function PaintComponent({
    type = 'paint'
}: {
    type?: "paint" | 'text'
}) {
    const [signature, setSignature] = useState<Blob | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const signatureRef = useRef<SignatureRef | null>(null);

    const handleEffacerSignature = () => {
        if (signatureRef.current) {
            signatureRef.current.clear()
        }
        setSignature(null)
        setIsTyping(false)
    }

    const theme = useTheme();
    // const mdUp=

    return (
        <div>
            <Stack
                direction={{ xs: 'column-reverse', md: 'row' }}
                spacing={2}
                sx={{
                    p: 2,
                    alignItems: 'center',
                    justifyContent: isTyping ? 'flex-start' : 'space-between',
                }}
            >
                <StyledSignatureBox
                    type={type}
                >
                    <Signature
                        ref={signatureRef}
                        // width={type !== 'paint' ? 300 : }
                        // height={300}
                        options={{
                            size: 7,
                            thinning: type === 'paint' ? 0.5 : 0.8,
                        }}
                        onPointerDown={(points) => {
                            setIsTyping(true)
                        }}
                    />
                </StyledSignatureBox>
                {
                    (!isTyping && type === 'paint') &&
                    <img
                        src="/assets/shape.jpg"
                        alt="image"
                        width={300}
                        height={300}
                    />
                }

            </Stack>
            {
                isTyping && (
                    <Stack
                        alignItems='center'
                    >
                        <Button
                            variant="outlined"
                            onClick={handleEffacerSignature}
                            color='error'
                            sx={{ width: "fit-content" }}
                        >
                            مسح واعادة
                        </Button>
                    </Stack>
                )
            }

        </div>
    )
}
