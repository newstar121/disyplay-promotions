import { Button, Col, Image, Row } from "react-bootstrap";

const NewCustomer = ({ promotion }) => {

    return (
        <Row className="mb-20">
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                <Image src={promotion.heroImageUrl} className="w-full h-full">

                </Image>
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                <div className="flex flex-column justify-around customer-card p-20 h-100" >
                    <div className="fs-24 bold mb-20">
                        {promotion.name || ''}
                    </div>
                    <span className="fs-12 mb-20">
                        {promotion.description || ''}
                    </span>
                    <div className="flex justify-around">
                        <Button variant="primary" className="w-30 mr-2">{promotion.termsAndConditionsButtonText}</Button>
                        <Button variant="primary" className="w-30 ml-2">{promotion.joinNowButtonText}</Button>
                    </div>
                </div>
            </Col>

        </Row>
    )
}

export default NewCustomer;