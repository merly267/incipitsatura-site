const Copyright = () => {
    const startYear = process.env.NEXT_PUBLIC_SITE_CREATED_DATE
    const currentYear = new Date().getFullYear()

    return (
        <p>{`©${process.env.NEXT_PUBLIC_SITE_TITLE} ${currentYear === startYear ? currentYear : `${startYear}-${currentYear}`}`}</p>
    )
}

export default Copyright