// src/app/(legal)/terms/page.tsx
import { FC } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft  } from '@fortawesome/free-solid-svg-icons';

const TermsPage: FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
          <span className="hidden sm:inline">Back to Drawing</span>
        </Link>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-8">
          <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-semibold mb-2 text-gray-800">Terms of Service</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: {currentDate}</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Ownership of Content</h2>
              <ul className="space-y-2 text-gray-600">
                <li>All drawings and creative works made using It&apos;s Scribble Scrabble Time belong to their creators.</li>
                <li>By using It&apos;s Scribble Scrabble Time, you confirm that you have the right to create and share any content you make using our tools.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Content Storage and Display</h2>
              <p className="text-gray-600 mb-4">When you save drawings on It&apos;s Scribble Scrabble Time:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>You retain all rights to your creations</li>
                <li>You grant us permission to store and display your drawings as part of providing our service</li>
                <li>You can delete your content at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Appropriate Content</h2>
              <p className="text-gray-600 mb-4">As It&apos;s Scribble Scrabble Time is designed for children, all content must be:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>Family-friendly</li>
                <li>Appropriate for all ages</li>
                <li>Free from offensive or inappropriate material</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">4. Privacy</h2>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>We do not collect personal information from users</li>
                <li>Any saved drawings are stored securely</li>
                <li>We do not share or sell any user data or content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">5. Changes to Terms</h2>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>We may update these terms as we add new features</li>
                <li>Continued use of It&apos;s Scribble Scrabble Time means you accept any changes to these terms</li>
              </ul>
            </section>

            <section className="pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact</h2>
              <p className="text-gray-600">
                If you have any questions about these terms, please contact us at{' '}
                <a 
                  href="mailto:hello@itsscribblescrabbletime.com" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  hello@itsscribblescrabbletime.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} It&apos;s Scribble Scrabble Time All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;