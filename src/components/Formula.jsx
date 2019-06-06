import React from 'react';

class Formula extends React.Component {
    render() {
        return (
            <div id="formula">
                {this.props.formula}
            </div>
        )
    }
}

export default Formula;