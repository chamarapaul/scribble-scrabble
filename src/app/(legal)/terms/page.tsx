// src/app/(legal)/terms/page.tsx
import { FC } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TermsPage: FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-4 py-2 bg-white border-b">
        <div className="flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-800"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
            <span className="font-fredoka">Back to Drawing</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-8">
          <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-semibold mb-2 text-gray-800">Terms of Service</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: {currentDate}</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Ownership and Rights</h2>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>All drawings and creative works made using It&apos;s Scribble Scrabble Time belong to their creators</li>
                <li>Users retain full rights to download, modify, or delete their content</li>
                <li>By using It&apos;s Scribble Scrabble Time, you confirm that you have the right to create and store any content using our tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Content Guidelines</h2>
              <p className="text-gray-600 mb-4">As It&apos;s Scribble Scrabble Time is designed for children, all content must be:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>Family-friendly</li>
                <li>Appropriate for all ages</li>
                <li>Free from offensive or inappropriate material</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Privacy and Data Collection</h2>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>We do not collect or store any personal information</li>
                <li>All drawing data is stored exclusively in your local browser storage</li>
                <li>No data is transmitted to our servers</li>
                <li>We do not use cookies or tracking mechanisms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">4. Local Storage and Data Management</h2>
              <p className="text-gray-600 mb-4">It&apos;s Scribble Scrabble Time utilizes browser local storage for drawing data:</p>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>All drawings are stored locally in your browser&apos;s storage</li>
                <li>Storage is limited to 30 drawings, with oldest drawings being automatically removed when this limit is reached</li>
                <li>Drawings persist until manually deleted or browser data is cleared</li>
                <li>Drawings are device and browser-specific and cannot be accessed across different devices or browsers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">5. Service Limitations</h2>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>Drawing data is limited to browser local storage capacity</li>
                <li>No cloud storage or synchronization services are provided</li>
                <li>Service availability depends on browser compatibility and local storage access</li>
                <li>We do not guarantee the persistence of drawings beyond browser storage limitations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">6. Changes to Terms</h2>
              <ul className="space-y-2 text-gray-600 list-disc pl-5">
                <li>We reserve the right to modify these terms as features and functionality evolve</li>
                <li>Continued use of It&apos;s Scribble Scrabble Time after changes indicates acceptance of updated terms</li>
                <li>Material changes to functionality or data handling will be communicated via service updates</li>
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