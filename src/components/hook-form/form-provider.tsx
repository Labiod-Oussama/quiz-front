import { UseFormReturn, FormProvider as Form } from 'react-hook-form';


type Props = {
    children: React.ReactNode;
    methods: UseFormReturn<any>;
    onSubmit?: VoidFunction;
    onChange?: VoidFunction;
    onSelect?: VoidFunction
};

export default function FormProvider({ children, onSubmit, methods, onChange, onSelect }: Props) {
    return (
        <Form  {...methods}>
            <form onSubmit={onSubmit} onChange={onChange} onSelect={onSelect}>{children}</form>
        </Form>
    );
}
