import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'PixelMind Learning'
const SITE_URL = 'https://www.pixelmindlearning.org'
const CONTACT_EMAIL = 'pixelmindlearning@gmail.com'

interface CourseInfo {
  title: string
  day: string
  time: string
  dateRange: string
}

interface WelcomeRegistrationProps {
  firstName?: string
  courses?: CourseInfo[]
}

function buildGoogleCalendarUrl(course: CourseInfo): string {
  // Parse dateRange like "6/15-7/20" into start/end dates (2026)
  const year = 2026
  const [startStr, endStr] = course.dateRange.split('-')
  const [startMonth, startDay] = startStr.split('/').map(Number)
  const [endMonth, endDay] = endStr.split('/').map(Number)

  // Parse time like "1pm-2pm"
  const timeMatch = course.time.match(/(\d+)(am|pm)\s*-\s*(\d+)(am|pm)/i)
  let startHour = 13, endHour = 14
  if (timeMatch) {
    startHour = parseInt(timeMatch[1]) + (timeMatch[2].toLowerCase() === 'pm' && parseInt(timeMatch[1]) !== 12 ? 12 : 0)
    endHour = parseInt(timeMatch[3]) + (timeMatch[4].toLowerCase() === 'pm' && parseInt(timeMatch[3]) !== 12 ? 12 : 0)
  }

  // First class date
  const startDate = new Date(year, startMonth - 1, startDay, startHour, 0, 0)
  const endDate = new Date(year, startMonth - 1, startDay, endHour, 0, 0)

  // Last class date for recurrence
  const lastDate = new Date(year, endMonth - 1, endDay, endHour, 0, 0)

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

  // Map day name to RRULE BYDAY
  const dayMap: Record<string, string> = {
    Mondays: 'MO', Tuesdays: 'TU', Wednesdays: 'WE',
    Thursdays: 'TH', Fridays: 'FR', Saturdays: 'SA', Sundays: 'SU',
  }
  const byDay = dayMap[course.day] || 'MO'
  const untilStr = fmt(lastDate).split('T')[0] + 'T235959Z'

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${course.title} — ${SITE_NAME}`,
    dates: `${fmt(startDate)}/${fmt(endDate)}`,
    recur: `RRULE:FREQ=WEEKLY;BYDAY=${byDay};UNTIL=${untilStr}`,
    details: `Weekly ${course.title} class with ${SITE_NAME}.\n\nQuestions? Email ${CONTACT_EMAIL}`,
    location: 'Online (Google Classroom link will be shared)',
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

const WelcomeRegistrationEmail = ({ firstName, courses = [] }: WelcomeRegistrationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to {SITE_NAME} — you're registered!</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={headerSection}>
          <Text style={brandText}>⚡ {SITE_NAME}</Text>
        </Section>

        <Heading style={h1}>
          {firstName ? `Welcome, ${firstName}!` : 'Welcome to PixelMind Learning!'}
        </Heading>

        <Text style={text}>
          Thank you for joining <strong>{SITE_NAME}</strong>! We're thrilled to have you
          in our community of young learners exploring technology and creativity.
        </Text>

        {courses.length > 0 && (
          <>
            <Heading as="h2" style={h2}>Your Registered Classes</Heading>
            {courses.map((course, i) => (
              <Section key={i} style={courseCard}>
                <Text style={courseTitle}>{course.title}</Text>
                <Text style={courseDetails}>
                  📅 {course.day} &nbsp;|&nbsp; 🕐 {course.time} &nbsp;|&nbsp; 📆 {course.dateRange}
                </Text>
                <Button
                  style={calendarButton}
                  href={buildGoogleCalendarUrl(course)}
                >
                  ➕ Add to Google Calendar
                </Button>
              </Section>
            ))}
          </>
        )}

        <Hr style={hr} />

        <Heading as="h2" style={h2}>What Happens Next?</Heading>
        <Text style={text}>
          More information will be sent out soon, including your <strong>Google Classroom links</strong> and
          any materials you may need before class begins.
        </Text>
        <Text style={text}>
          Keep an eye on your inbox — we'll be in touch within the next few days with everything
          you need to get started.
        </Text>

        <Hr style={hr} />

        <Text style={text}>
          If you have any questions in the meantime, don't hesitate to reach out:
        </Text>
        <Text style={contactText}>
          📧{' '}
          <Link href={`mailto:${CONTACT_EMAIL}`} style={link}>
            {CONTACT_EMAIL}
          </Link>
        </Text>

        <Button style={ctaButton} href={SITE_URL}>
          Visit {SITE_NAME}
        </Button>

        <Text style={footer}>
          We can't wait to see you in class! — The {SITE_NAME} Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WelcomeRegistrationEmail,
  subject: (data: Record<string, any>) =>
    data.firstName
      ? `Welcome to PixelMind Learning, ${data.firstName}!`
      : 'Welcome to PixelMind Learning!',
  displayName: 'Registration Welcome',
  previewData: {
    firstName: 'Alex',
    courses: [
      { title: 'Python 101', day: 'Mondays', time: '1pm-2pm', dateRange: '6/15-7/20' },
      { title: 'Intro to Computer-Aided Design (CAD)', day: 'Tuesdays', time: '1pm-2pm', dateRange: '6/16-7/21' },
    ],
  },
} satisfies TemplateEntry

// Styles
const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }
const container = { padding: '20px 25px', maxWidth: '600px', margin: '0 auto' }
const headerSection = { marginBottom: '24px' }
const brandText = {
  fontSize: '18px',
  fontWeight: 'bold' as const,
  color: 'hsl(185, 100%, 40%)',
  margin: '0',
}
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  color: 'hsl(222, 60%, 8%)',
  margin: '0 0 16px',
}
const h2 = {
  fontSize: '18px',
  fontWeight: 'bold' as const,
  color: 'hsl(222, 60%, 8%)',
  margin: '24px 0 12px',
}
const text = {
  fontSize: '14px',
  color: 'hsl(216, 15%, 40%)',
  lineHeight: '1.6',
  margin: '0 0 16px',
}
const courseCard = {
  backgroundColor: '#f0fdfa',
  border: '1px solid hsl(185, 60%, 85%)',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '12px',
}
const courseTitle = {
  fontSize: '16px',
  fontWeight: 'bold' as const,
  color: 'hsl(222, 60%, 8%)',
  margin: '0 0 8px',
}
const courseDetails = {
  fontSize: '13px',
  color: 'hsl(216, 15%, 40%)',
  margin: '0 0 12px',
  lineHeight: '1.5',
}
const calendarButton = {
  backgroundColor: 'hsl(185, 100%, 50%)',
  color: 'hsl(222, 60%, 8%)',
  fontSize: '13px',
  borderRadius: '6px',
  padding: '8px 16px',
  textDecoration: 'none',
  fontWeight: 'bold' as const,
}
const hr = { borderColor: '#e5e7eb', margin: '24px 0' }
const link = { color: 'hsl(185, 100%, 40%)', textDecoration: 'underline' }
const contactText = {
  fontSize: '14px',
  color: 'hsl(216, 15%, 40%)',
  margin: '0 0 24px',
}
const ctaButton = {
  backgroundColor: 'hsl(185, 100%, 50%)',
  color: 'hsl(222, 60%, 8%)',
  fontSize: '14px',
  borderRadius: '8px',
  padding: '12px 24px',
  textDecoration: 'none',
  fontWeight: 'bold' as const,
  display: 'block' as const,
  textAlign: 'center' as const,
  marginBottom: '24px',
}
const footer = { fontSize: '12px', color: '#999999', margin: '24px 0 0' }
