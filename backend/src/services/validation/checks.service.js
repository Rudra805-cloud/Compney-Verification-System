async function checks(hostname,companyName) {

    return {
        websiteExists: true,
        sslEnabled: true,
        contactInfoFound: false,
        linkedInFound: false,
        domainAgeYears: 0
    };
}

export { checks };