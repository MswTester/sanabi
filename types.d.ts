interface Faq {
    question: string;
    answer: string;
}

interface Step{
    title: string;
    description: string;
    features: string[];
}

interface Token {
    key: string;
    expiration: number;
    perms: string[];
    using: boolean;
}