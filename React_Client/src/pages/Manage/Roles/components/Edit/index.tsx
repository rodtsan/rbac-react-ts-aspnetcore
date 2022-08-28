import React, { useEffect, useRef } from 'react';
/** Hooks */
import { useForm } from '@common/hooks/useForm';
/** Components */
import Modal from '@components/Modal';

export interface FormProps {
    name: string;
    description: string;
}

export interface Role {
    roleId?: string;
    name: string;
    description: string;
    normalizedName: string;
}

export interface AddOrEditRoleProps {
    role: Role;
    visible: boolean;
    onCancel?: React.MouseEventHandler<HTMLButtonElement>;
    onSubmit?: (role: FormProps) => void;
}

const AddOrEditRole: React.FunctionComponent<AddOrEditRoleProps> = ({
    role,
    visible,
    onCancel
}) => {
    const saveButtonRef = useRef<HTMLButtonElement>(null);
    const { handleSubmit, handleChange, setFields, data, errors } = useForm<FormProps>({
        initialValues: {
            name: '',
            description: ''
        },
        validations: {
            name: {
                pattern: {
                    value: '^[A-Za-z]*$',
                    message: "You're not allowed"
                }
            },
            description: {
                pattern: {
                    value: '^[A-Za-z]*$',
                    message: "You're not allowed"
                }
            }
        },
        onSubmit: () => {}
    });

    useEffect(() => {
        setFields({
            name: role.name,
            description: role.description
        });
    }, [role]);

    const handleOk = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        saveButtonRef.current?.click();
        event.stopPropagation();
        event.preventDefault();
    };

    return (
        <Modal
            title={role.normalizedName}
            visible={visible}
            okText="Update"
            onOk={handleOk}
            onCancel={onCancel}
        >
            <form onSubmit={handleSubmit} className="form-horizontal">
                <div className="form-group">
                    <label className="form-label" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        defaultValue={data.name}
                        onChange={handleChange('name')}
                        className="form-control"
                        required
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="description">
                        Description
                    </label>
                    <input
                        id="description"
                        defaultValue={data.description}
                        onChange={handleChange('description')}
                        className="form-control"
                        required
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>
                <div className="p-10"></div>
                <div className="form-group" style={{ padding: 50, textAlign: 'center' }}>
                    <button
                        ref={saveButtonRef}
                        className="btn btn-primary ms-auto w-50 visually-hidden"
                        type="submit"
                    >
                        .visually-hidden
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddOrEditRole;
