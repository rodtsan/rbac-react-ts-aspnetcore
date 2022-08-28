import React, { PureComponent } from 'react';
import DropdownItem, { DropdownItemType } from './DropdownItem';

export interface DropdownProps {
    name: string;
    children?: DropdownItemType[];
    defaultValue?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface DropdownState {
    value?: string;
}

class Dropdown extends PureComponent<DropdownProps, DropdownState> {
    static Item: typeof DropdownItem;
    constructor(props: DropdownProps, state: DropdownState) {
        super(props);
        this.state = {
            value: props.defaultValue
        };
    }

    componentDidUpdate(prevProps: DropdownProps, prevState: DropdownState) {
        console.log('Prev state', prevState); // Before update
        console.log('New state', this.state); // After update
    }

    handleClick = (value: string) => this.setState({ value });

    render() {
        const options =
            this.props.children?.filter(
                (child) => child.props.value == this.state.value
            ) || [];
        const children =
            options && options.length > 0 ? options : this.props.children || [];
        const values = children.map((child) => ({
            value: child.props.value,
            text: child.props.children
        }));
        return (
            <div className="rs-dropdown dropdown">
                <button
                    className="form-control dropdown-toggle text-start w-100"
                    type="button"
                    id={String(this.props.name).concat('_dropdown')}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {values[0]?.text || 'Select Country'}
                    <input
                        type="hidden"
                        id={this.props.name}
                        name={this.props.name}
                        value={values[0]?.value}
                        onChange={this.props.onChange}
                    />
                </button>
                <ul
                    className="dropdown-menu dropdown-menu-vscroll"
                    aria-labelledby={String(this.props.name).concat('_dropdown')}
                >
                    {this.props.children?.map((child: DropdownItemType, key: number) => {
                        const childProps = {
                            key,
                            ...child.props,
                            onClick: this.handleClick
                        };
                        return React.cloneElement(child, childProps);
                    })}
                </ul>
            </div>
        );
    }
}

Dropdown.Item = DropdownItem;

export default Dropdown;
