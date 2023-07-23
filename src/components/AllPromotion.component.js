const AllPromtion = ({ promotion }) => {

    return (
        <div className="flex flex-column pt-10 pl-5 pr-5">
            <div className="fs-24 bold mb-5">
                {promotion.name || ''}
            </div>
            <span className="fs-12">
                {promotion.description || ''}
            </span>
        </div>
    )
}

export default AllPromtion;