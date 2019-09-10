import React from "react";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import EditForm from "./EditForm";

interface IModifyBookingProp {
    updateState: any;
    booking: any;
}

interface IModifyBookingState {
    modal: boolean;
}

export class ModifyBooking extends React.Component<IModifyBookingProp, IModifyBookingState> {
    constructor(props: any) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState((prevState: any) => ({
            modal: !prevState.modal
        }))
    };

    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
        let button = (
            <Button
                color="warning"
                onClick={this.toggle}
                style={{float: "left", marginRight: "10px"}}>Edit
            </Button>);
        let title = 'Edit Item';
        return (
            <div>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                        <EditForm
                            updateState={this.props.updateState}
                            toggle={this.toggle}
                            booking={this.props.booking}/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
